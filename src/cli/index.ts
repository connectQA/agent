import { QuestionCollection } from "inquirer";
import { menuHandler } from "../utils/menu.js";

export const tokenRegister: QuestionCollection = [
  {
    type: "input",
    name: "accountId",
    message: "Account ID:",
  },
  {
    type: "password",
    name: "token",
    message: "Token:",
    mask: "*",
  },
];

export const menu: QuestionCollection = [
  {
    type: "list",
    name: "option",
    message: "What do you want to do?",
    choices: ["Start the app", "Register a new token", "Close"],
    filter(val) {
      return menuHandler(val.toLowerCase());
    },
  },
];
