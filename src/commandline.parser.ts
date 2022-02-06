import { Command } from "commander";
import { allCommands } from "./commands";
const program = new Command();

program.name('Son Of A Git! (soag)')
    .description('Git & Github utility CLI for quick workflow')
    .version('0.1.0');

allCommands.forEach(({command, description, options, action}) => {
    const commandDefintion = program.command(command);
    commandDefintion.description(description);
    options.forEach(opt => commandDefintion.option(opt[0], opt[1]));
    commandDefintion.action(action)
});




export default program;