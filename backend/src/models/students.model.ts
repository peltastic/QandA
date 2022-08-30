import { Schema, model, ObjectId } from "mongoose";
import bcrypt from "bcrypt";
import { generateCode } from "../utils/generate";
export interface IStudent {
  username: string;
  displayName: string;
  email: string;
  password: string;
  accountType: "teacher" | "student";
  topics: string[];
  teachers: string[];
  bookmarks: string[];
  profileImageUrl?: string;
  verificationCode: string;
  passowrdResetCode: string;
  verified: boolean;
  _id: ObjectId;
}

const studentSchema = new Schema({
  username: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  topics: [String],
  teachers: { type: [String], default: [] },
  accountType: { type: String, enum: ["teacher", "student"] },
  bookmarks: { type: [String], default: [] },
  profileImageUrl: String,
  verificationCode: { type: String, default: () => generateCode() },
  passowrdResetCode: { type: String, default: "" },
  verified: { type: Boolean, default: false },
});

studentSchema.pre("save", async function () {
  console.log(this.password)
  const hash = await bcrypt.hash(this.password, 14);
  this.password = hash;
});

const StudentModel = model<IStudent>("student", studentSchema);
export default StudentModel;
