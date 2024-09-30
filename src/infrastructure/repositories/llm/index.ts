import mongoose from 'mongoose';
import LLMModel from '../../database/mongo/models/llm'
import LLM from '../../../domain/interfaces/llm';
import LLMRepositoryInterface from '../../../domain/repositories/llm.interface';


export default class LLMRepository implements LLMRepositoryInterface {
  find = async (query: any): Promise<LLM[]> => {
    const ret: any[] = await LLMModel.find(query).sort({createdAt: -1}).lean()
    return ret;
  }


  findOne = async (query: any):  Promise<LLM> => {
    const ret: any = await LLMModel.findOne(query).sort({createdAt: -1}).lean()
    return ret;
  }

  findById = async (id: string):  Promise<LLM> => {
    const ret: any = await LLMModel.findById(id).lean()
    return ret;
  }

  insert = async (LLM: LLM):  Promise<LLM> => {
    const obj = new LLMModel(LLM);
    const ret: any = await obj.save();
    return ret;
  }

  update = async (LLM: Partial<LLM>, findQuery: Object):  Promise<LLM> => {    
    return LLMModel.findOneAndUpdate(findQuery, LLM , {new: true}).lean()    
  }

  findExistingReading = async (customerCode: string, measureType: "WATER" | "GAS", measureDatetime: Date): Promise<LLM | null> => {
    
    const month = measureDatetime.getMonth();
    const year = measureDatetime.getFullYear();

    const ret: any = await LLMModel.findOne({
      customer_code: customerCode,
      measure_type: measureType,      
      $expr: {
        $and: [
          { $eq: [{ $month: "$measure_datetime" }, month + 1] }, 
          { $eq: [{ $year: "$measure_datetime" }, year] }
        ]
      }
    }).lean();

    return ret || null; 
  };
}
