import type { Response } from "express";
import { envKeys } from "../utils/envKeys.js";

const oneDay = 24 * 60 * 60 * 1000;

export function setAuthCookies(
  res: Response,
  accessToken: string,
  refreshToken: string
) {
  const secure = envKeys.COOKIE_SECURE === "false" ? false : true;
  const domain = envKeys.COOKIE_DOMAIN || undefined;

  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15m
    domain,
    path: "/",
  });
  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure,
    sameSite: "strict",
    maxAge: 30 * oneDay, // 30d
    domain,
    path: "/",
  });
}

export function clearAuthCookies(res: Response) {
  const secure = envKeys.COOKIE_SECURE === "false" ? false : true;
  const domain = envKeys.COOKIE_DOMAIN || undefined;
  res.clearCookie("access_token", {
    httpOnly: true,
    secure,
    sameSite: "strict",
    domain,
    path: "/",
  });
  res.clearCookie("refresh_token", {
    httpOnly: true,
    secure,
    sameSite: "strict",
    domain,
    path: "/",
  });
}
