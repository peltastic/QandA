import { Request, Response } from "express";
import { findUserById } from "../services/user.service";

async function verifyUser(req: Request, res: Response) {
  const id = req.params.id;
  const verificationCode = req.params.verificationCode;
  const accountType = req.params.accountType;
  if (!id || !verificationCode || !accountType) {
    return res.sendStatus(400);
  }
  const user = await findUserById(id, accountType);
  if (!user) {
    return res.send("Could Not Verify User");
  }
  if (user.verified) {
    return res.send("User is already Verified");
  }
  if (user.verificationCode === verificationCode) {
    user.verified = true;
    user.save();
    return res.status(200).send("User Verified");
  }

  return res.status(400).send("Could not verify user");
}

export { verifyUser };
