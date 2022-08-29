import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { generateCode } from "../utils/generate";

interface ITeacher {
  username: string;
  displayName: string;
  email: string;
  password: string;
  topics: string[];
  upvotes: number;
  accountType: "teacher" | "student";
  studentsCount: number;
  students: string[];
  bookmarks: string[];
  profileImageUrl?: string;
  websiteLink?: string;
  verifcationCode: number;
  passowrdResetCode: string;
  verified: boolean;
}

const teacherSchema = new Schema({
  username: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  topics: [String],
  accountType: { enum: ["teacher", "student"] },
  upvotes: { type: Number, default: 0 },
  studentsCount: { type: Number, default: 0 },
  students: { type: [String], default: [] },
  bookmarks: { type: [String], default: [] },
  profileImageUrl: String,
  websiteLink: String,
  verificationCode: { type: String, default: () => generateCode() },
  passowrdResetCode: {type: String, default: ""},
  verified: { type: Boolean, default: false },
});

teacherSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, 14);
  this.password = hash;
});

const TeacherModel = model<ITeacher>("teacher", teacherSchema);

export default TeacherModel;
