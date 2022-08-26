import { Schema, model } from "mongoose";
import bcrypt from "bcrypt"

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
}

const teacherSchema = new Schema({
  username: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  topics: [String],
  accountType: { enum: ["teacher", "student"] },
  upvotes: {type: Number, default: 0},
  studentsCount: {type: Number, default: 0},
  students: {type: [String], default: []},
  bookmarks: {type: [String], default: []},
  profileImageUrl: String,
  websiteLink: String,
});

teacherSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, 14);
  this.password = hash;
});

const TeacherModel = model<ITeacher>("teacher", teacherSchema);

export default TeacherModel;
