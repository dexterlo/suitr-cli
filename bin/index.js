#! /usr/bin/env node
import { fileToArray } from './file-utils.js';
import { getCombinations, arraysAreEqual } from "./math-utils.js";
import { getSuitabilityScore } from './suitability-score.js';

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

    // dedupe off of index-mappings array
    if (!possibleRoutes.find(e => arraysAreEqual(e.mappings, routeSoFar))) {
      
      // create a route object to hold properties
      let finalizedRoute = {};

      // keep mappings arrays to make deduping easier
      finalizedRoute.mappings = routeSoFar.concat();

      // fill out the elements with driver/destination info
      finalizedRoute.assignments = routeSoFar.map(obj => {
          let a = {};
          a.driver = drivers[obj[0]];
          a.destination = destinations[obj[1]];
          a.suitability = getSuitabilityScore(a.destination, a.driver);
          return a;
        });
      
      // cheat by adding this sum to the parent route object
      // to avoid having to calculate on the fly later
      finalizedRoute.totalScore = finalizedRoute.assignments.reduce(
        (res, currObj) => {return res + currObj.suitability}, 0);

      possibleRoutes.push(finalizedRoute); 
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

// get the highest scoring route
// this doesn't really take into account that multiple routes could have same score
let maxScore = 0, bestRoute = null;
for (let i = 0; i < possibleRoutes.length; i++) {
  if (possibleRoutes[i].totalScore > maxScore) {
    bestRoute = possibleRoutes[i];
    maxScore = bestRoute.totalScore;
  }
}

// print result
console.log("\nHighest Route Score: " + bestRoute.totalScore + "\n");
console.log(bestRoute.assignments);
