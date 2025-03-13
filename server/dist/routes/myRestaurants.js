"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyAccessToken_1 = require("../middleware/general/verifyAccessToken");
const multer_1 = require("../middleware/myRestaurants/multer");
const validatorMyRestaurants_1 = require("../middleware/myRestaurants/validatorMyRestaurants");
const asyncWrapper_1 = require("../middleware/general/asyncWrapper");
const myRestaurantsControllers_1 = require("../controllers/myRestaurantsControllers");
const router = (0, express_1.default)();
router
    .route("/")
    .post(verifyAccessToken_1.verifyAccessToken, multer_1.uploadMyRestaurants, validatorMyRestaurants_1.validatorMyRestaurants, validatorMyRestaurants_1.validateFiles, (0, asyncWrapper_1.asyncWrapper)(myRestaurantsControllers_1.createRestaurant))
    .get(verifyAccessToken_1.verifyAccessToken, (0, asyncWrapper_1.asyncWrapper)(myRestaurantsControllers_1.getMyRestaurants));
exports.default = router;
