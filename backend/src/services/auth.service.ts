import StudentModel from "../models/students.model";
import TeacherModel from "../models/teachers.model";
import { ISignUp } from "../schema/auth.schema";

function createUser(body: ISignUp) {
  if (body.accountType === "teacher") {
    return TeacherModel.create(body);
  }

  return StudentModel.create(body);
}
export { createUser };
