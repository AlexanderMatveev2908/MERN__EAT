import { Request, Response } from "express";
import User from "../../models/User";
import {
  checkTokenSHA,
  genAccessJWT,
  genTokenJWE,
  genTokenSHA,
} from "../../utils/token";
import { checkPwdBcrypt, hashPwdBcrypt } from "../../utils/hashPwd";

export const recoverPwd = async (req: Request, res: Response): Promise<any> => {
  const { userId, password, token } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ msg: "User not found" });
  if (!user.isVerified)
    return res
      .status(403)
      .json({ success: false, msg: "I don't even know how u get so far 🤔" });
  if (!user.tokens.recoverPwd?.hashed)
    return res.status(401).json({ success: false, msg: "Unauthorized" });

  const hasExpired =
    new Date(user.tokens.recoverPwd?.expiry ?? 0)?.getTime() < Date.now();
  const isMatch = checkTokenSHA(
    token,
    user.tokens.recoverPwd.expiry ?? "",
    "auth"
  );
  if (hasExpired || !isMatch) {
    user.tokens.recoverPwd.hashed = null;
    user.tokens.recoverPwd.expiry = null;

    await user.save();

    if (hasExpired)
      return res.status(401).json({ success: false, msg: "Token expired" });
    else return res.status(401).json({ success: false, msg: "Invalid token" });
  }

  if (password === user.email)
    return res
      .status(400)
      .json({ success: false, msg: "Password cannot be the same as email" });

  const isSamePwd = await checkPwdBcrypt(password, user.password);
  if (isSamePwd)
    return res.status(400).json({
      success: false,
      msg: "new password must be different from old one",
    });

  const hashedPwd = await hashPwdBcrypt(password);

  user.password = hashedPwd;
  user.tokens.recoverPwd.hashed = null;
  user.tokens.recoverPwd.expiry = null;

  const accessToken = genAccessJWT(user._id);

  const { jwe, expiry } = await genTokenJWE(user._id);
  // const {
  //   token: refreshToken,
  //   hashedToken,
  //   expiryVerification,
  // } = genTokenSHA("refresh");

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
  //  res.cookie("refreshToken", refreshToken, {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === "production",
  //     expires: expiryVerification,
  //   });

  return res
    .status(200)
    .json({ accessToken, success: true, userEmail: user.email });
};
