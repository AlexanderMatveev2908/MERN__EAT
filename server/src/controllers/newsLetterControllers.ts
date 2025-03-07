import { Request, Response } from "express";
import { RequestWithUserId } from "../middleware/general/verifyAccessToken";
import User from "../models/User";
import { REG_EMAIL } from "../constants/regex";
import { checkTokenSHA, genTokenSHA } from "../utils/token";
import NonLoggedUserNewsLetter from "./../models/UserNewsLetter";
import {
  badRequest,
  baseErrResponse,
  unauthorizedErr,
  userNotFound,
} from "../utils/baseErrResponse";
import { sendSubScriptionNewsLetterConfirmed } from "../utils/mail";

export const toggleUserNewsLetter = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const { type } = req.body;

  if (!["subscribe", "unsubscribe"].includes(type)) return badRequest(res);

  const { token, hashedToken, expiryVerification } = genTokenSHA("newsletter");

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        hasSubscribedToNewsletter: type === "subscribe",
        "tokens.unSubScribeNewsLetter.hashed": hashedToken,
        "tokens.unSubScribeNewsLetter.expiry": expiryVerification,
      },
    },
    { new: true, select: "hasSubscribedToNewsletter firstName lastName email" }
  );

  if (!updatedUser) return userNotFound(res);

  await sendSubScriptionNewsLetterConfirmed(
    updatedUser,
    token,
    "logged",
    "subscribe"
  );

  return res.status(200).json({
    msg: "User toggled to newsletter",
    success: true,
    user: updatedUser,
  });
};

export const subscribeNonLoggedUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email } = req.body;

  if (!REG_EMAIL.test(email)) return badRequest(res);

  const existingUser = await User.findOne({ email }).lean();
  if (existingUser) baseErrResponse(res, 409, "User already registered");
  const existingSubscription = await User.findOne({ email }).lean();
  if (existingSubscription)
    return baseErrResponse(res, 409, "User already subscribed");

  const { token, hashedToken, expiryVerification } = genTokenSHA("newsletter");

  const newUser = await NonLoggedUserNewsLetter.create({
    email,
    hashedTokenToUnsubscribe: hashedToken,
    tokenExpiry: expiryVerification,
  });

  await sendSubScriptionNewsLetterConfirmed(
    newUser,
    token,
    "non-logged",
    "subscribe"
  );

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

  if (!user) return userNotFound(res);
  if (!user.hasSubscribedToNewsletter)
    return baseErrResponse(res, 403, "User not subscribed to newsletter");
  if (!user.tokens.unSubScribeNewsLetter?.hashed) return badRequest(res);

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

    return unauthorizedErr(res, hasExpired ? "Token Expired" : "Invalid Token");
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
  if (!user) return userNotFound(res);
  if (!user?.hashedTokenToUnsubscribe) return badRequest(res);

  const isMatch = checkTokenSHA(
    token,
    user.hashedTokenToUnsubscribe,
    "newsletter"
  );
  const hasExpired = new Date(user?.tokenExpiry ?? 0).getTime() < Date.now();
  if (!isMatch || hasExpired) {
    user.tokenExpiry = null;
    user.hashedTokenToUnsubscribe = null;

    await user.save();

    return unauthorizedErr(res, hasExpired ? "Token Expired" : "Invalid Token");
  }

  const result = await NonLoggedUserNewsLetter.deleteOne({ email: user.email });
  if (result?.deletedCount === 0) return userNotFound(res);
  else
    return res
      .status(200)
      .json({ msg: "User unsubscribed to newsletter", success: true });
};

export const sendEmailUnsubscribeRetryLogged = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) userNotFound(res);
  if (!user?.hasSubscribedToNewsletter)
    return baseErrResponse(res, 403, "User not subscribed");

  const { token, hashedToken, expiryVerification } = genTokenSHA("newsletter");

  user.tokens.unSubScribeNewsLetter = {
    hashed: hashedToken,
    expiry: expiryVerification,
  };

  await user.save();

  await sendSubScriptionNewsLetterConfirmed(
    user,
    token,
    "logged",
    "unsubscribe"
  );
};

export const sendEmailUnsubscribeRetryNonLogged = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email } = req.body;

  const user = await NonLoggedUserNewsLetter.findOne({ email });
  if (!user) return userNotFound(res);

  const { token, hashedToken, expiryVerification } = genTokenSHA("newsletter");

  user.hashedTokenToUnsubscribe = hashedToken;
  user.tokenExpiry = expiryVerification;

  await user.save();

  await sendSubScriptionNewsLetterConfirmed(
    user,
    token,
    "non-logged",
    "unsubscribe"
  );

  return res.status(200).json({
    msg: "Email sent to unsubscribe",
    success: true,
  });
};

// export const unSubscribeAllUsersRetry = async (
//   req: Request,
//   res: Response
// ): Promise<any> => {
//   const { email, type } = req.body;

//   if (!REG_EMAIL.test(email) || !["logged", "non-logged"].includes(type))
//     return badRequest(res);

//   if (type === "logged") {
//     const user = await User.findOne({ email });

//     if (!user) return userNotFound(res);
//     if (!user?.hasSubscribedToNewsletter)
//       return baseErrResponse(res, 403, "User not subscribed");

//     user.hasSubscribedToNewsletter = false;

//     await user.save();
//   } else {
//     const user = await NonLoggedUserNewsLetter.findOne({ email });

//     if (!user) return userNotFound(res);

//     const result = await NonLoggedUserNewsLetter.deleteOne({ email });
//     if (result.deletedCount === 0) return userNotFound(res);
//   }

//   return res
//     .status(200)
//     .json({ msg: "User unsubscribed to newsletter", success: true });
// };
