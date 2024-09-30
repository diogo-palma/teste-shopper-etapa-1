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

  async confirm(req,res) {
    const { measure_uuid, confirmed_value} = req.body
    await this.service.confirm(measure_uuid, confirmed_value);    
    res.json({success: true})
  }

  async listReadings(req, res) {
    const { customer_code } = req.params;
    const { measure_type } = req.query;

    const result = await this.service.list(customer_code, measure_type);
    res.json(result)
  }

}