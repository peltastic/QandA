import { Request, Response } from "express";
import { SignUpUserInput } from "../schema/auth.schema";
import { createUser } from "../services/auth.service";

async function signUpUser(req: Request, res: Response) {
  const body = req.body;
  const error = SignUpUserInput(body);
  if (error) {
    return res.status(400).send(error);
  }
  try {
    await createUser(body);
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

export { signUpUser };

