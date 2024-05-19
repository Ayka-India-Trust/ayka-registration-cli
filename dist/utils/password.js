"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePasswordFunction = void 0;
const generate_password_1 = __importDefault(require("generate-password"));
function generatePasswordFunction() {
    /**
      This function generates a random password using the generate-password package.
      The password is 6 characters long and contains numbers and uppercase letters.
      */
    return generate_password_1.default.generate({
        length: 6,
        numbers: true,
        uppercase: true,
    });
}
exports.generatePasswordFunction = generatePasswordFunction;
