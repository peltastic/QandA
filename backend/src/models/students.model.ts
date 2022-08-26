import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
interface IStudent {
  username: string;
  displayName: string;
  email: string;
  password: string;
  accountType: "teacher" | "student";
  topics: string[];
  teachers: string[];
  bookmarks: string[];
  profileImageUrl?: string;
}

const studentSchema = new Schema({
  username: { type: String, required: true, unique:true },
  displayName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  topics: [String],
  teachers: { type: [String], default: [] },
  accountType: { enum: ["teacher", "student"] },
  bookmarks: { type: [String], default: [] },
  profileImageUrl: String,
});

studentSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, 14);
  this.password = hash;
});

const StudentModel = model<IStudent>("student", studentSchema);
export default StudentModel;
