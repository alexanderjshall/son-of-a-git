import inquirer, { QuestionCollection } from "inquirer";
import { commitMetaToInquirerChoice, supportedCommitMeta } from "../utils/commit-title-meta.js";
import simpleGit from "simple-git";
import chalk from "chalk";
import { ICommandDetails } from "./ICommandDetails.js";

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

async function commitCommand(): Promise<void> {
    const {header, title, body} = await inquirer.prompt(questionCollection);
    try {
        const response = await simpleGit().commit(constructGitMessage(header, title, body));
        console.log(chalk.green(`💚 Commit Successful - ${response.commit} on branch ${response.branch}`));
    } catch (error) {
        console.error(chalk.red("😢 Commit failed! "), error);
    }
}

export const commitCommandDetails: ICommandDetails = {
    command: "c",
    description: "A workflow for detailed & conventional commits",
    options: [["-a, --amend", "Amend the previous commit"]],
    action: commitCommand
};

const constructGitMessage = (type: string, title: string, body: string):string => `${type}: ${title}\n${body}`;