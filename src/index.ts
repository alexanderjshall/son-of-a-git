#!/usr/bin/env node

import commitCommand from "./commands/commit.js";
import statCommand from "./commands/stat.js";
import {SpinnerFactory} from "./utils/spinner-factory.js";

(async function main() {

    await statCommand(SpinnerFactory.CreateDefault('Fetching Git Status'));
    await commitCommand();
})();
