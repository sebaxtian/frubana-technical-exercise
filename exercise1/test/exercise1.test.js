var assert = require('assert');
var solveProblem = require("../index");

describe("Solve Problem", function() {
  describe("#solution1", function() {
    it("should return list with the solution", function() {
      const n = 7;
      const operations = ['r 1', 'a 1', 'a 2', 'a 1', 'r 1', 'r 2', 'r 1'];
      const solution = ['Wrong!', 1, 1.5, 1, 1.5, 1, 'Wrong!'];
      assert.deepEqual(solveProblem(n, operations), solution);
    });
  });
  describe("#solution2", function() {
    it("should return list with the solution", function() {
      const n = 4;
      const operations = ['r 2', 'a 3', 'r 6', 'r 3'];
      const solution = ['Wrong!', 3, 'Wrong!', 'Wrong!'];
      assert.deepEqual(solveProblem(n, operations), solution);
    });
  });
});
