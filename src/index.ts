#!/usr/bin/env node

import statCommand from "./commands/stat.js";
import {SpinnerFactory} from "./utils/spinner-factory.js";

statCommand(SpinnerFactory.CreateDefault('getting git status'));
