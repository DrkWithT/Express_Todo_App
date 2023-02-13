/**
 * @file validators.js
 * @brief Contains functions to validate non-string values used in queries.
 * @author Derek Tan
 */

/**
 * @description Checks if a number is between two numbers inclusively.
 * @param {number} num Defaults to 0.
 * @param {object} constraints An object with `min`, `max`, and possibly a flag for `minOnly`.
 */
function isBetweenInclusive(num = 0, constraints) {
    if (constraints.minOnly) {
        return num >= constraints.min;
    }

    return num >= constraints.min && num <= constraints.max;
}

// TODO: add more helper validation functions as I go...

module.exports = {
    isBetweenInclusive: isBetweenInclusive
};