"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    tempNewEmail: {
        type: String,
        default: null,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        country: {
            type: String,
            default: null,
        },
        state: {
            type: String,
            default: null,
        },
        city: {
            type: String,
            default: null,
        },
        street: {
            type: String,
            default: null,
        },
        zipCode: {
            type: String,
            default: null,
        },
        phone: {
            type: String,
            default: null,
        },
    },
    acceptedTerms: {
        type: Boolean,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    hasSubscribedToNewsletter: {
        type: Boolean,
        default: false,
    },
    tokens: {
        refresh: {
            hashed: {
                type: String,
                default: null,
            },
            expiry: {
                type: Date,
                default: null,
            },
        },
        verifyAccount: {
            hashed: {
                type: String,
                default: null,
            },
            expiry: {
                type: Date,
                default: null,
            },
        },
        recoverPwd: {
            hashed: {
                type: String,
                default: null,
            },
            expiry: {
                type: Date,
                default: null,
            },
        },
        unSubScribeNewsLetter: {
            hashed: {
                type: String,
                default: null,
            },
            expiry: {
                type: Date,
                default: null,
            },
        },
        manageAccount: {
            hashed: {
                type: String,
                default: null,
            },
            expiry: {
                type: Date,
                default: null,
            },
        },
        verifyNewEmail: {
            hashed: {
                type: String,
                default: null,
            },
            expiry: {
                type: Date,
                default: null,
            },
        },
    },
}, { timestamps: true });
const User = mongoose_1.default.models.User || mongoose_1.default.model("User", UserSchema);
exports.default = User;
