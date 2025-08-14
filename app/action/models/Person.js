import mongoose from "mongoose";

const personSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    picture: { type: String, required: false },
    email: { type: String, required: false },
  },
  { timestamps: true }
);

export const Person = mongoose.model("Person", personSchema);
