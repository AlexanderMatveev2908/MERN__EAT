import { Request, Response } from "express";
import { RequestWithUserId } from "../middleware/general/verifyAccessToken";
import User, { UserType } from "../models/User";
import { REG_EMAIL } from "../constants/regex";
import { checkTokenSHA } from "../utils/token";
import NonLoggedUserNewsLetter from "./../models/UserNewsLetter";
import { baseErrResponse, userNotFound } from "../utils/baseErrResponse";

export const toggleUserNewsLetter = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const { type } = req.body;

  if (!["subscribe", "unsubscribe"].includes(type))
    baseErrResponse(res, 400, "Bad request");

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: { hasSubscribedToNewsletter: type === "subscribe" } },
    { new: true, select: "hasSubscribedToNewsletter firstName lastName email" }
  ).lean();

  if (!updatedUser) userNotFound(res);

  return res.status(200).json({
    msg: "User subscribed to newsletter",
    success: true,
    user: updatedUser,
  });
};

export const subscribeNonLoggedUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email } = req.body;

  if (!REG_EMAIL.test(email)) baseErrResponse(res, 400, "Bad request");

  const existingUser = await User.findOne({ email }).lean();
  if (existingUser) baseErrResponse(res, 403, "Invalid request");

  const existingSubscription = await User.findOne({ email }).lean();
  if (existingSubscription)
    baseErrResponse(res, 409, "User already subscribed");

  await NonLoggedUserNewsLetter.create({ email });

  return res.status(201).json({
    msg: "User subscribed to newsletter",
    success: true,
  });
};

export const unsubScribeNewsLetterViaEmailLinkLogged = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId, token } = req.body;

  const user = await User.findById(userId);

  if (!user) userNotFound(res);
  if (!user.hasSubscribedToNewsletter)
    baseErrResponse(res, 403, "User not subscribed to newsletter");
  if (!user.tokens.unSubScribeNewsLetter?.hashed)
    baseErrResponse(res, 400, "Bad request");

  const hasExpired =
    new Date(user.tokens.unSubScribeNewsLetter?.expiry ?? 0).getTime() <
    Date.now();
  const isMatch = checkTokenSHA(
    token,
    user.tokens.unSubScribeNewsLetter?.hashed ?? "",
    "newsletter"
  );
  if (hasExpired || !isMatch) {
    user.tokens.unSubScribeNewsLetter = {
      hashed: null,
      expiry: null,
    };

    await user.save();

    baseErrResponse(res, 401, hasExpired ? "Token Expired" : "Invalid Token");
  }

  user.hasSubscribedToNewsletter = false;

  await user.save();

  return res.status(200).json({
    msg: "User unsubscribed to newsletter",
    success: true,
  });
};

export const unsubScribeNewsLetterViaEmailLinkNonLogged = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { token, userId } = req.body;

  const user = await NonLoggedUserNewsLetter.findById(userId);
  if (!user) userNotFound(res);
  if (!user?.hashedTokenToUnsubscribe) baseErrResponse(res, 400, "Bad Request");

  const isMatch = checkTokenSHA(
    token,
    user.hashedTokenToUnsubscribe,
    "newsletter"
  );
  const hasExpired =
    new Date(user.tokens.unSubScribeNewsLetter?.expiry ?? 0).getTime() <
    Date.now();
  if (!isMatch || hasExpired) {
    user.tokenExpiry = null;
    user.hashedTokenToUnsubscribe = null;

    await user.save();

    baseErrResponse(res, 401, hasExpired ? "Token Expired" : "Invalid Token");
  }
};
