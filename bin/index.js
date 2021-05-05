#! /usr/bin/env node
import fileToArray from './file-utils.js';

// read files
const fileArgs = process.argv.slice(2);
const destinations = fileToArray(fileArgs[0]);
const drivers = fileToArray(fileArgs[1]);