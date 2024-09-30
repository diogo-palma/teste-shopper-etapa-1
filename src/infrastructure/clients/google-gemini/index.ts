import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

dotenv.config();

export class GoogleGeminiApiClient {
  private fileManager: GoogleAIFileManager;
  private genAI: GoogleGenerativeAI;

  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set in the environment variables");
    }

    this.fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }

  
  public async uploadBase64AndGenerateContent(base64Image: string): Promise<any> {
    const tempFileName = `${uuidv4()}.png`; 
    const tempFilePath = path.join(global.appRoot,  'public', tempFileName);
    console.log("tempFilePath", tempFilePath)
    try {
      const imageBuffer = Buffer.from(base64Image, 'base64');

      fs.writeFileSync(tempFilePath, imageBuffer);

      const uploadResponse = await this.fileManager.uploadFile(tempFilePath, {
        mimeType: "image/png",
        displayName: tempFileName,
      });
  
      console.log(`Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`);

      const model = this.genAI.getGenerativeModel({
        model: "gemini-1.5-pro", 
      });

      const result = await model.generateContent([
        {
          fileData: {
            mimeType: uploadResponse.file.mimeType,
            fileUri: uploadResponse.file.uri,
          },
        },
        { text: "Extract the value shown on this meter." }, 
      ]);

      const generatedText = result.response.text();

      const measureValue = this.extractNumericValue(generatedText);
     
      return {
        image_url: `http://localhost:9000/${tempFileName}`,
        measure_value: measureValue,
        measure_uuid: uuidv4()
      };
    } catch (error) {
      console.error("Error during file upload and content generation:", error);
      throw new Error("Failed to upload and generate content");
    } 

  }

  private extractNumericValue(text: string): number {
    const match = text.match(/\d+(\.\d+)?/); 
    if (match) {
      return parseFloat(match[0]);
    }
    throw new Error("No numeric value found in the generated content");
  }

  
}

