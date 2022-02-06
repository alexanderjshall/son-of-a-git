import inquirer, { QuestionCollection } from "inquirer";
import { commitMetaToInquirerChoice, supportedCommitMeta } from "../utils/commit-title-meta.js";
import simpleGit from "simple-git";
import chalk from "chalk";

const questionCollection: QuestionCollection = [
    {
        name: "header",
        type: "list",
        message: "Commit Type:",
        choices: supportedCommitMeta.map(commitMetaToInquirerChoice)
    },
    {
        name: "title",
        type: "input",
        message: "Snappy Title:"
    },
    {
        name: "body",
        type: "input",
        message: "Further Details:"
    }
];

export default async function commitCommand() {
    const {header, title, body} = await inquirer.prompt(questionCollection);
    console.log(header, title, body);
    try {
        const response = await simpleGit().commit(constructGitMessage(header, title, body));
        console.log(chalk.green("💚 Commit Successful"));
        console.log(chalk.green(`${response.author}: ${response.commit}`));
    } catch (error) {
        console.error(chalk.red("😢 Commit failed! "), error);
    }
}

const constructGitMessage = (type: string, title: string, body: string):string => `${type}: ${title}\n${body}`;