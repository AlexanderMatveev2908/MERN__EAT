import { Request, Response } from "express";
import { RequestWithUserId } from "../middleware/general/verifyAccessToken";
import User from "../models/User";
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

  const { token, hashedToken, expiryVerification } = genTokenSHA("newsletter");

  const existingUser = await User.findOne({ email });
  const existingSubscription = await NonLoggedUserNewsLetter.findOne({
    email,
  }).lean();

  if (existingUser) {
    if (existingUser.hasSubscribedToNewsletter) {
      return baseErrResponse(res, 409, "User already subscribed");
    } else {
      existingUser.hasSubscribedToNewsletter = true;
      existingUser.tokens.unSubScribeNewsLetter = {
        hashed: hashedToken,
        expiry: expiryVerification,
      };

      await existingUser.save();

      await sendSubScriptionNewsLetterConfirmed(
        existingUser,
        token,
        "logged",
        "subscribe"
      );

      return res.status(200).json({
        msg: "User subscribed to newsletter",
        success: true,
      });
    }
  } else if (existingSubscription) {
    return baseErrResponse(res, 409, "User already subscribed");
  }

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

export const sendEmailUnsubscribeRetry = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email } = req.body;

  const { token, hashedToken, expiryVerification } = genTokenSHA("newsletter");

  const existingNonLoggedUser = await NonLoggedUserNewsLetter.findOne({
    email,
  });
  if (!existingNonLoggedUser) {
    const loggedUser = await User.findOne({ email });

    if (!loggedUser) userNotFound(res);
    if (!loggedUser?.hasSubscribedToNewsletter)
      return baseErrResponse(res, 403, "User not subscribed");

    loggedUser.tokens.unSubScribeNewsLetter = {
      hashed: hashedToken,
      expiry: expiryVerification,
    };

    await loggedUser.save();

    await sendSubScriptionNewsLetterConfirmed(
      loggedUser,
      token,
      "logged",
      "unsubscribe"
    );

    return res.status(200).json({
      msg: "Email sent to unsubscribe",
      success: true,
    });
  } else {
    existingNonLoggedUser.hashedTokenToUnsubscribe = hashedToken;
    existingNonLoggedUser.tokenExpiry = expiryVerification;

    await existingNonLoggedUser.save();

    await sendSubScriptionNewsLetterConfirmed(
      existingNonLoggedUser,
      token,
      "non-logged",
      "unsubscribe"
    );

    return res.status(200).json({
      msg: "Email sent to unsubscribe",
      success: true,
    });
  }
};
