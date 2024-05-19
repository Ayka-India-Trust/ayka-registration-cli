"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AykaRegistration = void 0;
const schema_1 = require("./schema");
const db_1 = require("../utils/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const password_1 = require("../utils/password");
function AykaRegistration(values) {
    return __awaiter(this, void 0, void 0, function* () {
        const validatedFields = schema_1.RegisterSchema.safeParse(values);
        if (!validatedFields.success) {
            return {
                error: "Invalid input",
            };
        }
        const { name, email } = validatedFields.data;
        if (!name || !email) {
            return {
                error: "Name and email are required",
            };
        }
        const generatedPassword = (0, password_1.generatePasswordFunction)();
        if (!generatedPassword) {
            return {
                error: "Password generation failed",
            };
        }
        const hashedPassword = yield bcrypt_1.default.hash(generatedPassword, 10);
        const existingUser = yield db_1.db.user.findUnique({
            where: {
                email,
            },
        });
        if (existingUser) {
            return {
                error: "User already exists",
            };
        }
        yield db_1.db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        return {
            success: "User created Successfully",
            data: {
                email,
                password: generatedPassword,
            },
        };
    });
}
exports.AykaRegistration = AykaRegistration;
