"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyAccessToken_1 = require("../middleware/general/verifyAccessToken");
const asyncWrapper_1 = require("../middleware/general/asyncWrapper");
const newsLetterControllers_1 = require("../controllers/newsLetterControllers");
const makeLimiter_1 = require("../utils/makeLimiter");
const validatorToggleSubscribe_1 = require("../middleware/newsLetter/validatorToggleSubscribe");
const validatorNewsLetterEmail_1 = require("../middleware/newsLetter/validatorNewsLetterEmail");
const time_1 = require("../constants/time");
const validatorUnsubscribeVerify_1 = require("../middleware/newsLetter/validatorUnsubscribeVerify");
const router = (0, express_1.default)();
// i know i exaggerate with length of names i use for var or urls, i only do my best to be clearest possible and do not realize in the moment i wrote them how long are
router.patch("/toggle-logged", (0, makeLimiter_1.makeLimiter)({ max: 5 }), verifyAccessToken_1.verifyAccessToken, validatorToggleSubscribe_1.validatorToggleSubscribe, (0, asyncWrapper_1.asyncWrapper)(newsLetterControllers_1.toggleUserNewsLetter));
router.post("/subscribe-non-logged", (0, makeLimiter_1.makeLimiter)({ max: 5 }), validatorNewsLetterEmail_1.validatorNewsLetterEmail, (0, asyncWrapper_1.asyncWrapper)(newsLetterControllers_1.subscribeNonLoggedUser));
router.patch("/unsubscribe-via-link-logged", (0, makeLimiter_1.makeLimiter)({ max: 5 }), validatorUnsubscribeVerify_1.validatorUnsubscribeVerify, (0, asyncWrapper_1.asyncWrapper)(newsLetterControllers_1.unsubScribeNewsLetterViaEmailLinkLogged));
router.delete("/unsubscribe-via-link-non-logged", (0, makeLimiter_1.makeLimiter)({ max: 5 }), validatorUnsubscribeVerify_1.validatorUnsubscribeVerify, (0, asyncWrapper_1.asyncWrapper)(newsLetterControllers_1.unsubScribeNewsLetterViaEmailLinkNonLogged));
router.post("/send-email-unsubscribe", (0, makeLimiter_1.makeLimiter)({ max: 5, ms: time_1.HOUR }), validatorNewsLetterEmail_1.validatorNewsLetterEmail, (0, asyncWrapper_1.asyncWrapper)(newsLetterControllers_1.sendEmailUnsubscribeRetry));
exports.default = router;
