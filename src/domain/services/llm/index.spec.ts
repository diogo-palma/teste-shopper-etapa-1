import LLMService from ".";
import LLMRepositoryInterface from "../../../domain/repositories/llm.interface";
import { ValidatorServiceInterface } from "../../../domain/services/validator.interface";
import readLLMService from "../../../infrastructure/services/readLLM";
import LLM from "../../../domain/interfaces/llm";

const mockRepository: jest.Mocked<LLMRepositoryInterface> = {
  findExistingReading: jest.fn(),
  insert: jest.fn(),
  findById: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
};

const mockValidator: jest.Mocked<ValidatorServiceInterface> = {
  uploadLLM: jest.fn(),
  confirmLLM: jest.fn(),
  listTypeLLM: jest.fn(),

};

const mockReadLLMService: jest.Mocked<readLLMService> = {
  createLLM: jest.fn(),
};

describe("LLMService", () => {
  let llmService: LLMService;

  beforeEach(() => {
    llmService = new LLMService(mockRepository, mockValidator, mockReadLLMService);
  });

  it("should successfully upload an LLM and store the result", async () => {
    
    const mockLLM: LLM = {
      customer_code: "1234",
      measure_datetime: new Date(),
      measure_type: "WATER",
      image: "base64string",
      image_url: "some-url",
      measure_value: 100,
      measure_uuid: "uuid-1234"
    };

    mockValidator.uploadLLM.mockResolvedValueOnce(undefined);
    mockRepository.findExistingReading.mockResolvedValueOnce(null);
    mockReadLLMService.createLLM.mockResolvedValueOnce({
      image_url: "new-image-url",
      measure_value: 150,
      measure_uuid: "new-uuid"
    });
    mockRepository.insert.mockResolvedValueOnce(mockLLM);

    
    const result = await llmService.upload(mockLLM);

    
    expect(mockValidator.uploadLLM).toHaveBeenCalledWith(mockLLM);
    expect(mockRepository.findExistingReading).toHaveBeenCalledWith(
      mockLLM.customer_code,
      mockLLM.measure_type,
      expect.any(Date)
    );
    expect(mockReadLLMService.createLLM).toHaveBeenCalledWith(mockLLM);
    expect(mockRepository.insert).toHaveBeenCalledWith({
      ...mockLLM,
      image_url: "new-image-url",
      measure_value: 150,
      measure_uuid: "new-uuid"
    });
    expect(result).toEqual(mockLLM);
  });

  
});
