import { Request, Response } from "express";
import { SignUpUserInput } from "../schema/auth.schema";
import { createUser } from "../services/auth.service";

async function signUpUser(req: Request, res: Response) {
  const {
    username,
    email,
    displayName,
    password,
    topics,
    accountType,
    profileImageUrl,
    websiteLink,
  } = req.body;
  const error = SignUpUserInput({
    username,
    email,
    displayName,
    password,
    topics,
    accountType,
  });
  if (error) {
    return res.status(400).send(error);
  }
  try {
    await createUser({
      username,
      email,
      displayName,
      password,
      topics,
      accountType,
      profileImageUrl,
      websiteLink,
    });
    return res.status(200).send("user created successfully")
  } catch (e) {
    console.log(e);
    return res.sendStatus(409)
  }
}

export { signUpUser };
