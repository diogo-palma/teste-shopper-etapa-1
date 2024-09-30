import readLLMService from "../../../infrastructure/services/readLLM";
import LLM from "../../interfaces/llm";
import LLMRepositoryInterface from "../../repositories/llm.interface";
import { ValidatorServiceInterface } from "../validator.interface";


export default class LLMService {
  constructor( 
    private readonly repository: LLMRepositoryInterface,
    private readonly validator: ValidatorServiceInterface,
    private readonly readLLMservice: readLLMService
  ) {}

  async upload(llm: LLM) {
    await this.validator.uploadLLM(llm);

    const existingReading = await this.repository.findExistingReading(
      llm.customer_code,
      llm.measure_type,
      new Date(llm.measure_datetime)
    );

    if (existingReading) {
      throw {
        statusCode: 409,
        error_code: "DOUBLE_REPORT",
        error_description: "Leitura do mês já realizada"
      };
    }
    
    
    const readLLM = await this.readLLMservice.createLLM(llm);

    const data = {
      ...llm,
      image_url: readLLM.image_url,
      measure_value: readLLM.measure_value,
      measure_uuid: readLLM.measure_uuid
    };

    return this.repository.insert(data);
  }
}