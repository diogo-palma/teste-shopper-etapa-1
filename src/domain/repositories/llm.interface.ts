import LLM from '../interfaces/llm';

export default interface LLMRepositoryInterface {
  find(query: any): Promise<any[]>;

  findOne(query: any): Promise<any>;

  findById(id: string): Promise<any>;

  insert(llm: LLM): Promise<any>;

  update(llm: Partial<LLM>, findQuery: Object): Promise<LLM>;

  findExistingReading(customerCode: string, measureType: "WATER" | "GAS", measureDatetime: Date): Promise<LLM | null>;
}
