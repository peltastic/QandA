import { Request, Response } from "express";
import { SignupInput } from "../schema/auth.schema";
import { findUserByEmail } from "../services/user.service";
import { createUser, signAccessToken, signRefreshToken } from "../services/auth.service";
import sendEmail from "../utils/mailer";
import bcrypt from "bcrypt";

async function signupHandler(req: Request, res: Response) {
  const body = req.body;
  const error = SignupInput(body);
  if (error) {
    return res.status(400).send(error);
  }
  try {
    const user = await createUser(body);
    console.log(user.email);
    sendEmail({
      from: "qanda@test.com",
      to: user.email,
      subject: "Please Verify Your Account",
      text: `User Verification Code ${user.verificationCode}`,
    });

    return res.status(200).send("user created successfully");
  } catch (e: any) {
    console.log(e);
    if (e.code === 11000) {
      if (e.keyValue.username) {
        return res.status(409).send("Username already exists");
      } else if (e.keyValue.email) {
        return res.status(409).send("Account already exists");
      }
    }
    return res.sendStatus(500).send(e);
  }
}

async function signinHandler(req: Request, res: Response) {
  const { email, password, accountType } = req.body;
  const user = await findUserByEmail(email, accountType);
  if (!user) {
    return res.status(400).send("Invalid Email or Password, 1");
  }
  if (!user.verified) {
    return res.status(400).send("Please Verify Your Email");
  }
  console.log(user.password, password)
  const isValidPassword = await bcrypt.compare(password, user.password);
  console.log(isValidPassword)
  if (!isValidPassword) {
    return res.status(400).send("Invalid Email or Password, 2");
  }
  const accessToken = signAccessToken(user)
  const refreshToken = signRefreshToken(user._id)

  return res.status(200).json({
    accessToken,
    refreshToken
  })
}

export { signupHandler, signinHandler };
