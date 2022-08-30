import StudentModel from "../models/students.model";
import TeacherModel from "../models/teachers.model";

export function findUserById(id: string, accountType: string) {
  if (accountType === "teacher") {
    return TeacherModel.findById(id);
  } else if (accountType === "student") {
    return StudentModel.findById(id);
  }
}

export function findUserByEmail(email: string, accountType: string) {
  if (accountType === "teacher") {
    return TeacherModel.findOne({ email });
  }
  return StudentModel.findOne({ email });
}
