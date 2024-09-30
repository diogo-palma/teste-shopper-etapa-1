import LLMController from "../../../application/controllers/llm";
import ValidatorService from "../../../application/validation";
import LLMService from "../../../domain/services/llm";
import LLMRepository from "../../repositories/llm";
import ReadLLMService from "../../services/readLLM";

const llmRepository = new LLMRepository();
const validator = new ValidatorService();
const readLLMService = new ReadLLMService();

const llmService = new LLMService(llmRepository, validator, readLLMService);

const llmController = new LLMController(llmService)


const iocContainer = {
  llm: llmController
}

const container = {
  get: key => iocContainer[key]
}

export default container;