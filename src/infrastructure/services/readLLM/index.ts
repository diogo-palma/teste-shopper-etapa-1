import LLM from "../../../domain/interfaces/llm";
import { GoogleGeminiApiClient } from "../../clients/google-gemini";

export default class ReadLLMService {
  async createLLM(llm: LLM) {
    const geminiClient = new GoogleGeminiApiClient();    
    const res = await geminiClient.uploadBase64AndGenerateContent(llm.image);
    return res;
  }

}