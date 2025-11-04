import jwt from "jsonwebtoken";
import { envKeys } from "../utils/envKeys.js";

type JwtPayload = {
  sub: string; // user id
  role: "USER" | "ADMIN" | "SUBCOMMITTEE";
  sid?: string; // session id
};

export function signAccessToken(
  payload: JwtPayload,
  expiresIn: jwt.SignOptions["expiresIn"] = "15m"
) {
  const options: jwt.SignOptions = { expiresIn };
  return jwt.sign(payload, envKeys.ACCESS_SECRET as jwt.Secret, options);
}

export function signRefreshToken(
  payload: JwtPayload,
  expiresIn: jwt.SignOptions["expiresIn"] = "30d"
) {
  const options: jwt.SignOptions = { expiresIn };
  return jwt.sign(payload, envKeys.REFRESH_SECRET as jwt.Secret, options);
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, envKeys.ACCESS_SECRET) as JwtPayload &
    jwt.JwtPayload;
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, envKeys.REFRESH_SECRET) as JwtPayload &
    jwt.JwtPayload;
}
