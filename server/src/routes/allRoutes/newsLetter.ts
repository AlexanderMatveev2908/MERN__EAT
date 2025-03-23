import express from "express";
import { verifyAccessToken } from "../../middleware/general/verifyAccessToken.js";
import { asyncWrapper } from "../../middleware/general/asyncWrapper.js";
import {
  sendEmailUnsubscribeRetry,
  subscribeNonLoggedUser,
  toggleUserNewsLetter,
  unsubScribeNewsLetterViaEmailLinkLogged,
  unsubScribeNewsLetterViaEmailLinkNonLogged,
} from "../../controllers/newsLetterControllers.js";
import { makeLimiter } from "../../utils/makeLimiter.js";
import { validatorToggleSubscribe } from "../../middleware/newsLetter/validatorToggleSubscribe.js";
import { validatorNewsLetterEmail } from "../../middleware/newsLetter/validatorNewsLetterEmail.js";
import { HOUR } from "../../config/constants/time.js";
import { validatorUnsubscribeVerify } from "../../middleware/newsLetter/validatorUnsubscribeVerify.js";

const router = express();

// i know i exaggerate with length of names i use for var or urls, i only do my best to be clearest possible and do not realize in the moment i wrote them how long are

router.patch(
  "/toggle-logged",
  makeLimiter({ max: 5 }),
  verifyAccessToken,
  validatorToggleSubscribe,
  asyncWrapper(toggleUserNewsLetter)
);

router.post(
  "/subscribe-non-logged",
  makeLimiter({ max: 5 }),
  validatorNewsLetterEmail,
  asyncWrapper(subscribeNonLoggedUser)
);

router.patch(
  "/unsubscribe-via-link-logged",
  makeLimiter({ max: 5 }),
  validatorUnsubscribeVerify,
  asyncWrapper(unsubScribeNewsLetterViaEmailLinkLogged)
);

router.delete(
  "/unsubscribe-via-link-non-logged",
  makeLimiter({ max: 5 }),
  validatorUnsubscribeVerify,
  asyncWrapper(unsubScribeNewsLetterViaEmailLinkNonLogged)
);

router.post(
  "/send-email-unsubscribe",
  makeLimiter({ max: 5, ms: HOUR }),
  validatorNewsLetterEmail,
  asyncWrapper(sendEmailUnsubscribeRetry)
);

export default router;
