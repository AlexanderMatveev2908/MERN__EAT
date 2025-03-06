import { Request, Response } from "express";
import { RequestWithUserId } from "../middleware/general/verifyAccessToken";
import User, { UserType } from "../models/User";
import { REG_EMAIL } from "../constants/regex";
import { checkTokenSHA } from "../utils/token";
import NonLoggedUserNewsLetter from "./../models/UserNewsLetter";

export const toggleUserNewsLetter = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const { type } = req.body;

  if (!["subscribe", "unsubscribe"].includes(type))
    return res.status(400).json({ msg: "Invalid request", success: false });

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: { hasSubscribedToNewsletter: type === "subscribe" } },
    { new: true, select: "hasSubscribedToNewsletter firstName lastName email" }
  ).lean();

  if (!updatedUser)
    return res.status(400).json({ msg: "User not found", success: false });

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

  if (!REG_EMAIL.test(email))
    return res.status(400).json({ msg: "Invalid email", success: false });

  const existingUser = await User.findOne({ email }).lean();
  if (existingUser)
    return res.status(403).json({
      msg: "I do not think user should have arrive til here 🤔",
      success: false,
    });

  const existingSubscription = await User.findOne({ email }).lean();
  if (existingSubscription)
    return res
      .status(409)
      .json({ msg: "User already subscribed", success: false });

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

  if (!user)
    return res.status(404).json({ msg: "User not found", success: false });
  if (!user.hasSubscribedToNewsletter)
    return res.status(400).json({ msg: "User not subscribed", success: false });
  if (!user.tokens.unSubScribeNewsLetter?.hashed)
    return res.status(401).json({ msg: "Invalid token", success: false });

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

    if (hasExpired)
      return res.status(401).json({ msg: "Token expired", success: false });
    else if (!isMatch)
      return res.status(401).json({ msg: "Invalid token", success: false });
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
  if (!user)
    return res
      .status(404)
      .json({ msg: "User not found, so not subscribed", success: false });
  if (!user?.hashedTokenToUnsubscribe)
    return res.status(401).json({ msg: "Invalid token", success: false });

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

    if (!isMatch)
      return res.status(401).json({ msg: "Invalid token", success: false });
    if (hasExpired)
      return res.status(401).json({ msg: "Token expired", success: false });
  }
};
