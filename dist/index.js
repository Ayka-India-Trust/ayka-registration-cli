#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.main = void 0;
const p = __importStar(require("@clack/prompts"));
const registration_1 = require("./lib/registration");
const figlet_1 = __importDefault(require("figlet"));
const chalk_1 = __importDefault(require("chalk"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        p.intro(chalk_1.default.red(figlet_1.default.textSync("Ayka", { horizontalLayout: "full" })));
        p.intro(chalk_1.default.bgRed("Welcome to Ayka Registration CLI, please follow the prompts to create an account."));
        p.intro(chalk_1.default.bgYellow("Press Ctrl + C to cancel the operation at any time."));
        const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));
        const s = p.spinner();
        const admin = yield p.password({
            message: "Enter the admin passkey?",
            validate(value) {
                if (value !== "100")
                    return `Incorrect passkey, please try again.`;
            },
        });
        s.start("Checking passkey...");
        yield sleep();
        s.stop("Passkey verified!");
        if (p.isCancel(admin)) {
            p.cancel(chalk_1.default.red("Operation cancelled."));
            process.exit(0);
        }
        const name = yield p.text({
            message: "Enter your name",
            placeholder: "John Doe",
        });
        if (p.isCancel(name)) {
            p.cancel(chalk_1.default.red("Operation cancelled."));
            process.exit(0);
        }
        const email = yield p.text({
            message: "Enter your email",
            placeholder: "abc@gmail.com",
            //validate using regex
            validate(value) {
                if (!value.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/))
                    return `Invalid email address.`;
            },
        });
        if (p.isCancel(email)) {
            p.cancel(chalk_1.default.red("Operation cancelled."));
            process.exit(0);
        }
        s.start(chalk_1.default.green("Creating account..."));
        const Output = yield (0, registration_1.AykaRegistration)({
            name,
            email,
        });
        if (Output.success) {
            s.stop(chalk_1.default.green(Output.success) +
                " " +
                chalk_1.default.green(`Your account has been created successfully. Please find your credentials below:`) +
                chalk_1.default.green(`\nEmail: ${email}\nPassword: ${Output.data.password}`) +
                chalk_1.default.yellow(`\nProcess of sending emails has not been implemented yet.`));
            p.outro(chalk_1.default.green("Account created successfully!"));
            process.exit(0);
        }
        if (Output.error) {
            s.stop(chalk_1.default.red(Output.error) + " " + chalk_1.default.yellow("Please try again."));
            p.outro(chalk_1.default.red("Account creation failed."));
            process.exit(0);
        }
    });
}
exports.main = main;
main();
