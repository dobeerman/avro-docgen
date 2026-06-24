#!/usr/bin/env node
import { CliApplication } from "./CliApplication";

await new CliApplication().run(process.argv);
