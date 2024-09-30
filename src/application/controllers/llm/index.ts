import LLMService from "../../../domain/services/llm";

export default class LLMController {
  constructor (private readonly service: LLMService) {}


  async upload(req, res) {    
    const result = await this.service.upload(req.body);
    const data = {
      image_url: result.image_url,
      measure_value: result.measure_value,
      measure_uuid: result.measure_uuid
    }
    res.json(data);
  }

}