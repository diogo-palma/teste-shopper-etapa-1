import { Schema, model, Document, Model } from "mongoose";

export const LLMSchema = new Schema(
  {
    image: { type: String, required: true },
    customer_code: { type: String, required: true },
    measure_datetime: { type: Date, required: true },
    measure_type: { type: String, enum: ["WATER", "GAS"], required: true },
    image_url: { type: String, required: true },
    measure_value: { type: Number, required: true },
    measure_uuid: { type: String, required: true },
    confirmed_value: {type: Number}
  },
  {
    collection: 'LLM',
    timestamps: true
  }
)
export default model("LLM", LLMSchema);
