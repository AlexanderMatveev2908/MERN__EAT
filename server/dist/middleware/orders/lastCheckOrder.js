import { check } from "express-validator";
import { REG_CITY, REG_COUNTRY, REG_EMAIL, REG_NAME, REG_PHONE, REG_STATE, REG_STREET, REG_ZIP, } from "../../config/constants/regex.js";
import { handleValidator } from "../../utils/handleValidator.js";
export const validateLastCheckOrder = [
    check("email").matches(REG_EMAIL).withMessage("Invalid email"),
    check("firstName").matches(REG_NAME).withMessage("Invalid name"),
    check("lastName").matches(REG_NAME).withMessage("Invalid name"),
    check("country").matches(REG_COUNTRY).withMessage("Invalid country"),
    check("state").matches(REG_STATE).withMessage("Invalid state"),
    check("city").matches(REG_CITY).withMessage("Invalid city"),
    check("street").matches(REG_STREET).withMessage("Invalid street"),
    check("zipCode").matches(REG_ZIP).withMessage("Invalid zip code"),
    check("phone").matches(REG_PHONE).withMessage("Invalid phone number"),
    handleValidator(400),
];
