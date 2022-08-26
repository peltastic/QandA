import StudentModel from "../models/students.model";
import TeacherModel from "../models/teachers.model";
import { ISignUp } from "../schema/auth.schema";

function createUser({
  username,
  displayName,
  password,
  topics,
  email,
  accountType,
  profileImageUrl,
  websiteLink,
}: ISignUp) {
  if (accountType === "teacher") {
    return TeacherModel.create({
      username: username,
      displayName: displayName,
      password: password,
      topics: topics,
      email: email,
      accountType: accountType,
      profileImageUrl: profileImageUrl,
      websiteLink: websiteLink,
    });
  }

  return StudentModel.create({
    username: username,
    accountType: accountType,
    password: password,
    displayName: displayName,
    topics: topics,
    email: email,
  });
}
export { createUser };
