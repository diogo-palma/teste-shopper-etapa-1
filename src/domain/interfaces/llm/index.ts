export default interface LLM {  
  image: string;
  customer_code: string;
  measure_datetime: Date;
  measure_type: "WATER" | "GAS";
  image_url?: string;
  measure_value?: number;
  measure_uuid?: string;
}