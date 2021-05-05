#! /usr/bin/env node
import { fileToArray } from './file-utils.js';
import { getCombinations } from "./math-utils.js";

// read files
const fileArgs = process.argv.slice(2);
const destinations = fileToArray(fileArgs[0]);
const drivers = fileToArray(fileArgs[1]);

// build array of possible driver-to-destination index mappings (element: [Driver, Destination])
// decided to keep it light (no row data or suitability score logic yet)
// leave it until we build the actual routes
let possibleAssignments = getCombinations(drivers.length, destinations.length);
console.log(possibleAssignments);