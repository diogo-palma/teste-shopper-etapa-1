import LLM from "../interfaces/llm";

export interface ValidatorServiceInterface {
  uploadLLM(LLM: LLM): Promise<boolean>;
  confirmLLM(llm: Partial<LLM>): Promise<boolean>;  
  listTypeLLM(llm: Partial<LLM>): Promise<boolean>;
 
}