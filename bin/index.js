#! /usr/bin/env node
import { fileToArray } from './file-utils.js';
import { getCombinations } from "./math-utils.js";

// read files
const fileArgs = process.argv.slice(2);
const destinations = fileToArray(fileArgs[0]);
const drivers = fileToArray(fileArgs[1]);
const maxRouteLength = Math.min(drivers.length, destinations.length);

// build array of possible driver-to-destination index mappings (element: [Driver, Destination])
// decided to keep it light (no row data or suitability score logic yet)
// leave it until we build the actual routes
const possibleAssignments = getCombinations(drivers.length, destinations.length);

const possibleRoutes = [];

// recursively build array of possible routes (routes are arrays of mappings)
// uses "backtracking" algorithm
const generatePossibleRoutes = function(routeSoFar, remainingAssignments) {
  if (routeSoFar.length == maxRouteLength) {
    if (!possibleRoutes.find(e => e == routeSoFar)) {
      possibleRoutes.push(routeSoFar.concat()); 
    }
    return;
  }

  for (let i = 0; i < remainingAssignments.length; i++) {
    const nextAssignment = remainingAssignments[i];

    // don't duplicate driver or address for this route
    if (routeSoFar.find(e => e[0] == nextAssignment[0] || e[1] == nextAssignment[1])) {
      continue;
    }

	  // new mapping to add, so add it to our route-in-process
    routeSoFar.push(nextAssignment);
	  // splice off from the left, pass and recurse on the rest
    remainingAssignments.splice(i, 1);
    generatePossibleRoutes(routeSoFar, remainingAssignments);
	  // pop the route element so we can try another sub-combo in its place
    routeSoFar.pop();
    remainingAssignments.splice(i, 0, nextAssignment);
  }
};

generatePossibleRoutes([], possibleAssignments);
console.log(possibleRoutes);