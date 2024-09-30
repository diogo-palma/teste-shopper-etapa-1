import LLM from "../interfaces/llm";

export interface ValidatorServiceInterface {
  uploadLLM(LLM: LLM): Promise<boolean>;
 
}