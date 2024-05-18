#!/usr/bin/env node
import * as p from "@clack/prompts";
import { AykaRegistration } from "./lib/registration";
import figlet from "figlet";
import chalk from "chalk";

const adminPasskey = process.env.ADMIN_PASSKEY;

export async function main() {
  p.intro(chalk.red(figlet.textSync("Ayka", { horizontalLayout: "full" })));

  p.intro(
    chalk.bgRed(
      "Welcome to Ayka Registration CLI, please follow the prompts to create an account."
    )
  );

  p.intro(
    chalk.bgYellow("Press Ctrl + C to cancel the operation at any time.")
  );

  const sleep = (ms = 2000) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const s = p.spinner();

  const admin = await p.password({
    message: "Enter the admin passkey?",
    validate(value) {
      if (value !== adminPasskey) return `Incorrect passkey, please try again.`;
    },
  });

  s.start("Checking passkey...");
  await sleep();
  s.stop("Passkey verified!");

  if (p.isCancel(admin)) {
    p.cancel(chalk.red("Operation cancelled."));
    process.exit(0);
  }

  const name = await p.text({
    message: "Enter your name",
    placeholder: "John Doe",
  });

  if (p.isCancel(name)) {
    p.cancel(chalk.red("Operation cancelled."));
    process.exit(0);
  }

  const email = await p.text({
    message: "Enter your email",
    placeholder: "abc@gmail.com",
    //validate using regex
    validate(value) {
      if (!value.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/))
        return `Invalid email address.`;
    },
  });

  if (p.isCancel(email)) {
    p.cancel(chalk.red("Operation cancelled."));
    process.exit(0);
  }

  s.start(chalk.green("Creating account..."));

  const Output = await AykaRegistration({
    name,
    email,
  });

  if (Output.success) {
    s.stop(chalk.green(Output.success));
    p.outro(chalk.bgGreen("Account created successfully!"));
    p.text({
      message: chalk.bgGreen(
        `Email: ${Output.data.email}, Password: ${Output.data.password}`
      ),
    });
    p.outro(
      chalk.yellow(`\nProcess of sending emails has not been implemented yet.`)
    );

    process.exit(0);
  }

  if (Output.error) {
    s.stop(chalk.red(Output.error));
    p.text({
      message: chalk.red("Please try again."),
    });
    p.outro(chalk.red("Account creation failed."));
    process.exit(0);
  }
}

main();
