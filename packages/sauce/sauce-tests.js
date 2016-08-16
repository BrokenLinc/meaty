// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by sauce.js.
import { name as packageName } from "meteor/brokenlinc:sauce";

// Write your tests here!
// Here is an example.
Tinytest.add('sauce - example', function (test) {
  test.equal(packageName, "sauce");
});
