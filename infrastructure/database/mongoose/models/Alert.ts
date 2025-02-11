import { Schema, model } from "mongoose";
import Alert from "@app/domain/entities/Alert";
import { v4 as uuidv4 } from "uuid";

const AlertSchema = new Schema<Alert>(
  {
    identifier: {
      type: String,
      default: uuidv4,
      index: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    part: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const AlertModel = model<Alert>("Alert", AlertSchema);

export { AlertSchema, AlertModel };
