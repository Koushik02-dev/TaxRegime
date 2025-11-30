// models/Tax.js
import mongoose from "mongoose";

const TaxSchema = new mongoose.Schema(
  {
    pno: {
      type: String,
    },
    name: {
      type: String,
    },
    level: {
      type: String,
    },
    switchOption: {
      type: String,

      enum: ["yes", "no"],
    },
    enclosedDocs: {
      type: Boolean,
    },
    financialYear: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const Tax = mongoose.model("Tax", TaxSchema);

export default Tax;
