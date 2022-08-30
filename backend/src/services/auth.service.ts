import { ObjectId } from "mongoose";
import StudentModel, { IStudent } from "../models/students.model";
import TeacherModel, { ITeacher } from "../models/teachers.model";
import { ISignUp } from "../schema/auth.schema";
import { signJwt } from "../utils/jwt";

function createUser(body: ISignUp) {
  if (body.accountType === "teacher") {
    return TeacherModel.create(body);
  }

  return StudentModel.create(body);
}

function signAccessToken(user: ITeacher | IStudent) {
  const payload = {
    id: user._id,
    email: user.email,
    accountType: user.accountType,
    username: user.username,
    displayName: user.displayName,
  };
  const accessToken = signJwt(payload, "ACCESSTOKEN_PRIVATEKEY", {
    expiresIn: "15m",
  });
  return accessToken;
}

function signRefreshToken(userId: ObjectId) {
  const refreshToken = signJwt({ id: userId }, "REFRESHTOKEN_PRIVATEKEY", {
    expiresIn: "1y",
  });
  return refreshToken;
}

export { createUser, signAccessToken, signRefreshToken };
