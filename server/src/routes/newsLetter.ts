import express from "express";
import { verifyAccessToken } from "../middleware/general/verifyAccessToken";
import { asyncWrapper } from "../middleware/general/asyncWrapper";
import {
  sendEmailUnsubscribeRetry,
  subscribeNonLoggedUser,
  toggleUserNewsLetter,
  unsubScribeNewsLetterViaEmailLinkLogged,
  unsubScribeNewsLetterViaEmailLinkNonLogged,
} from "../controllers/newsLetterControllers";
import { makeLimiter } from "../utils/makeLimiter";
import { validatorUnsubscribeNewsLetterLink } from "../middleware/newsLetter/validatorUnsubscribeNewsLetterLogged";
import { validatorUnsubscribeNewsLetterRetry } from "../middleware/newsLetter/validatorUnsubscribeNonLogged";

const router = express();

// i know i exaggerate with length of names i use for var or urls, i only do my best to be clearest possible and do not realize in the moment i wrote them how long are

router.patch(
  "/toggle-logged",
  makeLimiter({ max: 5 }),
  verifyAccessToken,
  asyncWrapper(toggleUserNewsLetter)
);

router.post(
  "/subscribe-non-logged",
  makeLimiter({ max: 5 }),
  asyncWrapper(subscribeNonLoggedUser)
);

router.patch(
  "/unsubscribe-via-link-logged",
  makeLimiter({ max: 5 }),
  validatorUnsubscribeNewsLetterLink,
  asyncWrapper(unsubScribeNewsLetterViaEmailLinkLogged)
);

router.delete(
  "/unsubscribe-via-link-non-logged",
  makeLimiter({ max: 5 }),
  validatorUnsubscribeNewsLetterLink,
  asyncWrapper(unsubScribeNewsLetterViaEmailLinkNonLogged)
);

router.post(
  "/send-email-unsubscribe",
  makeLimiter({ max: 8 }),
  validatorUnsubscribeNewsLetterRetry,
  asyncWrapper(sendEmailUnsubscribeRetry)
);

export default router;
