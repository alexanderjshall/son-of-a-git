import inquirer, { QuestionCollection } from "inquirer";
import { commitMetaToInquirerChoice, supportedCommitMeta } from "../utils/commit-title-meta.js";
import simpleGit from "simple-git";

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
        message: "Further Details"
    }
];

export default async function commitCommand() {
    const {header, title, body} = await inquirer.prompt(questionCollection);
    console.log(header, title, body);
    simpleGit().commit(constructGitMessage(header, title, body));
}

const constructGitMessage = (type: string, title: string, body: string):string => `${type}: ${title}\n${body}`;