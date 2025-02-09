import { Schema, model } from "mongoose";
import Company from "@app/domain/entities/Company";
import { v4 as uuidv4 } from "uuid";

const CompanySchema = new Schema<Company>(
  {
    identifier: {
      type: String,
      default: uuidv4,
      index: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    bikes: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
);

const CompanyModel = model<Company>("Company", CompanySchema);

export { CompanySchema, CompanyModel };
