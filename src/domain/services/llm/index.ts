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

  async confirm(measure_uuid: string, confirmed_value: number) {
    await this.validator.confirmLLM({measure_uuid, confirmed_value});

    const reading = await this.repository.findOne({measure_uuid});
    if (!reading) {
      throw {
        statusCode: 404,
        error_code: "MEASURE_NOT_FOUND",
        error_description: "Leitura não encontrada"
      }       
    }

    if (reading.confirmed_value) {
      throw {
        statusCode: 409,
        error_code: "CONFIRMATION_DUPLICATE",
        error_description: "Leitura do mês já realizada"
      }        
    }
    const data = {
      ...reading,
      confirmed_value
    }

    await this.repository.update(data, reading)

    return true

  }

  async list(customer_code, measure_type){
   
    if (measure_type){
      await this.validator.listTypeLLM({measure_type})
    }

    const readings = await this.repository.find({customer_code, measure_type})

    if (!readings || readings.length === 0) {
      throw {
        statusCode: 404,
        error_code: "MEASURES_NOT_FOUND",
        error_description: "Nenhuma leitura encontrada"
      }  
    } else {
      const response = {
        customer_code,
        measures: readings.map(reading => ({
          measure_uuid: reading.measure_uuid,
          measure_datetime: reading.measure_datetime,
          measure_type: reading.measure_type,
          has_confirmed: reading.has_confirmed, 
          image_url: reading.image_url
        })),
      };

      return response;
    }

    
  }
}