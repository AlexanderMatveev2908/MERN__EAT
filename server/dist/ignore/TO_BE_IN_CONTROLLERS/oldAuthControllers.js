// import axios from "axios";
// import { Request, Response } from "express";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import {
//   makeOptAuth0Login,
//   makeOptAuth0Logout,
//   makeOptAuth0Refresh,
// } from "../utils/auth0";
// import User from "../models/User";
// import { JWTPayload } from "express-oauth2-jwt-bearer";
export {};
// export const exchangeToken = async (
//   req: Request,
//   res: Response
// ): Promise<any> => {
//   const { code, codeVerifier } = req.body;
//   if (!code || !codeVerifier)
//     return res.status(400).json({ success: false, message: "Code not found" });
//   const { data } = await axios.post(
//     `${process.env.AUTH0_URL}/oauth/token`,
//     makeOptAuth0Login(code, codeVerifier) + "",
//     {
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     }
//   );
//   const userInfo: JWTPayload | null | string = jwt.decode(data.id_token);
//   const existingUser = await User.findOne({
//     auth0UserId: (userInfo as JWTPayload)?.sub,
//     email: (userInfo as JWTPayload)?.email,
//   });
//   if (!existingUser)
//     await User.create({
//       auth0UserId: (userInfo as JWTPayload)?.sub,
//       email: (userInfo as JWTPayload)?.email,
//       given_name: (userInfo as JWTPayload)?.given_name,
//       family_name: (userInfo as JWTPayload)?.family_name,
//       nickname: (userInfo as JWTPayload)?.nickname,
//     });
//   res.cookie("refreshToken", data.refresh_token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
//     path: "/",
//     maxAge: 1000 * 60 * 60,
//   });
//   return res.status(200).json({
//     success: true,
//     accessToken: data.access_token,
//   });
// };
// export const logoutUser = async (req: Request, res: Response): Promise<any> => {
//   const { refreshToken } = req.cookies;
//   if (!refreshToken)
//     return res
//       .status(400)
//       .json({ success: false, message: "No refresh token" });
//   await axios.post(
//     `${process.env.AUTH0_URL}/oauth/revoke`,
//     makeOptAuth0Logout(refreshToken),
//     {
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     }
//   );
//   res.clearCookie("refreshToken", {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
//   });
//   return res.status(200).json({ success: true });
// };
// export const getRefreshToken = async (
//   req: Request,
//   res: Response
// ): Promise<any> => {
//   const { refreshToken } = req.cookies;
//   if (!refreshToken)
//     return res
//       .status(400)
//       .json({ success: false, message: "No refresh token" });
//   try {
//     const { data } = await axios.post(
//       `${process.env.AUTH0_URL}/oauth/token`,
//       makeOptAuth0Refresh(refreshToken),
//       {
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       }
//     );
//     res.cookie("refreshToken", data.refresh_token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
//       path: "/",
//       maxAge: 1000 * 60 * 60,
//     });
//     return res
//       .status(200)
//       .json({ success: true, accessToken: data.access_token });
//   } catch (err: any) {
//     return res.status(401).json({ success: false, message: err.message });
//   }
// };
