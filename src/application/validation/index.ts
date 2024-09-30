import Joi from 'joi';
import LLM from '../../domain/interfaces/llm';
import { ValidatorServiceInterface } from '../../domain/services/validator.interface';


export default class ValidatorService implements ValidatorServiceInterface {
  uploadLLM = async (LLM: LLM): Promise<boolean> => {
    const schema = Joi.object({
      image: Joi.string().pattern(/^([A-Za-z0-9+/=]+)$/).required(),
      customer_code: Joi.string().min(0).required(),
      measure_datetime: Joi.date().required(),
      measure_type: Joi.string().valid('WATER', 'GAS').required()    
    
    }).unknown(true);

    try {
      await schema.validateAsync(LLM, { abortEarly: false });
    } catch (err) {
      throw {
        statusCode: 400,
        error_code: 'INVALID_DATA',
        error_description: err.details,
      };
    }
    return true;
  }

  confirmLLM = async (llm: LLM): Promise<boolean> => {
    const schema = Joi.object({
      measure_uuid: Joi.string().required(),
      confirmed_value: Joi.number().min(0).required(),      
    
    }).unknown(true);

    try {
      await schema.validateAsync(llm, { abortEarly: false });      
    } catch (err) {
      throw {
        statusCode: 400,
        error_code: 'INVALID_DATA',
        error_description: err.details,
      };
    }
    return true;
  }

  listTypeLLM = async (llm: LLM): Promise<boolean> => {
    const schema = Joi.object({      
      measure_type: Joi.string().valid('WATER', 'GAS').required()
    
    }).unknown(true);

    try {
      await schema.validateAsync(llm, { abortEarly: false });      
    } catch (err) {
      throw {
        statusCode: 400,
        error_code: 'INVALID_TYPE',
        error_description: err.details,
      };
    }
    return true;
  }

 


}