import jwt from "jsonwebtoken";
import config from "config";

export function signJwt(
  object: Object,
  keyType: "ACCESSTOKEN_PRIVATEKEY" | "REFRESHTOKEN_PRIVATEKEY",
  options?: jwt.SignOptions | undefined
) {
  const signingkey = Buffer.from(
    config.get<string>(keyType),
    "base64"
  ).toString("ascii");
  return jwt.sign(object, signingkey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt(
  token: string,
  keyType: "ACCESSTOKEN_PUBLICKEY" | "REFRESHTOKEN_PUBLICKEY"
) {
  const publicKey = Buffer.from(config.get<string>(keyType), "base64").toString(
    "ascii"
  );
  try {
    const decoded = jwt.verify(token, publicKey);
    return decoded;
  } catch (e) {
    return null;
  }
}
