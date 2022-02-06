#!/usr/bin/env node

import program from "./commandline.parser.js";

(async function main() {
    await program.parseAsync();
})();
