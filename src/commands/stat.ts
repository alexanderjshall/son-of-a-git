import chalk, { ChalkInstance } from "chalk";
import { Ora } from "ora";
import simpleGit, { StatusResult } from "simple-git";

const supportedStatusTypes: Partial<Record<keyof StatusResult, MessageWithColor>> = {
    "staged": {
        message: "🟢 Staged",
        color: chalk.green
    },
    "not_added": {
        message: "🟡 Untracked",
        color: chalk.yellow
    },
    "conflicted": {
        message: "🟠 Conflicted",
        color: chalk.rgb(255,127,80)
    },
    "created": {
        message: "🔵 Created",
        color: chalk.blue
    },
    "deleted": {
        message: "❌ Deleted",
        color: chalk.red
    },
    "modified": {
        message: "🟣 Modified",
        color: chalk.rgb(148, 0, 211) 
    },
    "renamed": {
        message: "✏ Renamed",
        color: chalk.rgb(148, 0, 211) 
    }
};

export default async function statCommand(spinner: Ora) {
    spinner.start();
    try {
        const status = await simpleGit().status();    
        const statusMessages = getSupportedStatusMessages(status);
        spinner.stop();
        if (status.isClean()) console.log(chalk.bgGreen("Working branch clean 😍"))
        else {
            console.log(chalk.bgMagenta("STATUS"));
            statusMessages.forEach(logStatusByType);
        }
    } catch(error) {
        spinner.fail();
        console.log('Error getting git status: ', error);
    }
}

function getSupportedStatusMessages(status: StatusResult): StatusMessage[] {
    return Object.keys(supportedStatusTypes).map(supportedStatusType => {
        const { message, color } = supportedStatusTypes[supportedStatusType as keyof StatusResult]!;
        return new StatusMessage(
        status[supportedStatusType as keyof StatusResult] as string[], 
            message,
            color
        )
    });
}

function logStatusByType({statusTypeMessages, statusHeaderMessage, statusColorFunc}: StatusMessage): void {
    if (statusTypeMessages.length == 0) return;
    console.log(statusColorFunc(statusHeaderMessage));
    statusTypeMessages.forEach(file => console.log(statusColorFunc(`\t- ${file}`)));
}

class StatusMessage {
    constructor(
        public statusTypeMessages: string[],
        public statusHeaderMessage: string,
        public statusColorFunc: ChalkInstance
    ) {}
}

interface MessageWithColor {
    message: string;
    color: ChalkInstance;
}