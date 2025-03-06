import { Request, Response } from "express";
import User from "../../models/User";
import { checkTokenSHA, genAccessJWT, genTokenJWE } from "../../utils/token";
import NonLoggedUserNewsLetter from "../../models/UserNewsLetter";

export const verifyAccount = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId, token } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ msg: "User not found" });

  if (user.isVerified)
    return res.status(403).json({ msg: "User already verified" });
  if (!user.tokens.verifyAccount?.hashed)
    return res.status(401).json({ msg: "Unauthorized", success: false });
  if (
    new Date(user.tokens.verifyAccount?.expiry ?? 0)?.getTime() < Date.now()
  ) {
    user.tokens.verifyAccount.expiry = null;
    user.tokens.verifyAccount.hashed = null;

    await user.save();
    return res.status(401).json({ msg: "Token expired" });
  }

  const isMatch = checkTokenSHA(
    token,
    user.tokens.verifyAccount?.hashed ?? "",
    "auth"
  );
  if (!isMatch) return res.status(401).json({ msg: "Invalid token" });

  const isSubscribedNewsLetter = await NonLoggedUserNewsLetter.findOne({
    email: user.email,
  });
  if (isSubscribedNewsLetter) {
    await NonLoggedUserNewsLetter.deleteOne({ email: user.email });
    user.hasSubscribedToNewsletter = true;
  }

  user.isVerified = true;
  user.tokens.verifyAccount.expiry = null;
  user.tokens.verifyAccount.hashed = null;

  const accessToken = genAccessJWT(user._id);
  // const {
  //   token: refreshToken,
  //   hashedToken,
  //   expiryVerification,
  // } = genTokenSHA("refresh");

  const { jwe, expiry } = await genTokenJWE(user._id);

  user.tokens.refresh.hashed = jwe;
  user.tokens.refresh.expiry = expiry;
  // user.tokens.refresh.hashed = hashedToken;
  // user.tokens.refresh.expiry = expiryVerification;

  await user.save();

  res.cookie("refreshToken", jwe, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiry,
  });
  // res.cookie("refreshToken", refreshToken, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   expires: expiryVerification,
  // });

  return res.status(200).json({ accessToken, success: true });
};

export const verifyRecoverPwd = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId, token } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ msg: "User not found" });

  if (!user.isVerified)
    return res.status(403).json({ msg: "User not verified", success: false });
  if (!user.tokens.recoverPwd?.hashed)
    return res.status(401).json({ msg: "Unauthorized", success: false });
  if (new Date(user.tokens.recoverPwd?.expiry ?? 0)?.getTime() < Date.now()) {
    user.tokens.recoverPwd.hashed = null;
    user.tokens.recoverPwd.expiry = null;

    await user.save();

    return res.status(401).json({ msg: "Token expired", success: false });
  }

  const isMatch = checkTokenSHA(
    token,
    user.tokens.recoverPwd.hashed ?? "",
    "auth"
  );
  if (!isMatch)
    return res.status(401).json({ success: false, msg: "Invalid token" });

  return res.status(200).json({ success: true });
};
