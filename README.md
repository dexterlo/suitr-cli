# suitr-cli
NodeJS CLI tool that assigns drivers to shipment destinations by suitability score.

## Algorithm
This tool will create all possible routes between addresses and drivers where each driver can only be assigned a single address. Each possible route node is scored by the algorithm below, and the highest total route score is displayed along with the route assignments for that route.

The top-secret algorithm is:
* If the length of the shipment's destination street name is even, the base suitability score (SS) is the number of vowels in the driver’s name multiplied by 1.5.
* If the length of the shipment's destination street name is odd, the base SS is the number of consonants in the driver’s name multiplied by 1.
* If the length of the shipment's destination street name shares any common factors (besides 1) with the length of the driver’s name, the SS is increased by 50% above the base SS.

## Instructions

1. Assumes you have a recent version of [NodeJS](https://nodejs.org/en/download/).
2. Clone this repo into a local directory.
3. In a terminal window, `cd` into the application directory you just created.
4. Use npm to install suitr-cli to the command-line for access anywhere.
```
$: npm install -g .
```
5. Run `suitr` and pass in two newline-delimited files with destination addresses and driver names, respectivlely. (Two sample files have been included in the repo for convenience.)
```
suitr ./samples/destinations.csv ./samples/drivers.csv
```

## Uninstalling

1. Use npm to uninstall globally.
```
$: npm install -g suitr
```
2. Clean up mappings.
```
$: cd /usr/local/bin
$: rm suitr
```
