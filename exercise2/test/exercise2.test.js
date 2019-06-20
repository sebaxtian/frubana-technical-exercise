var assert = require('assert');
var solveProblem = require("../index");

describe("Solve Problem", function() {
  describe("#solution1", function() {
    it("should return list with the solution", function() {
      const n = 5;
      const colors = ['1', '2', '3', '2', '3'];
      const edges = [[ '1', '2' ], [ '2', '3' ], [ '2', '4' ], [ '1', '5' ]];
      const solution = [10, 9, 11, 9, 12];
      assert.deepEqual(solveProblem(n, colors, edges), solution);
    });
  });
  // describe("#solution2", function() {
  //   it("should return list with the solution", function() {
  //     const n = 6;
  //     const colors = ['2', '1', '3', '2', '3', '2'];
  //     const edges = [[ '1', '2' ], [ '1', '3' ], [ '1', '4' ], [ '4', '5' ], [ '1', '6' ]];
  //     const solution = [10, 9, 11, 9, 12];
  //     assert.deepEqual(solveProblem(n, colors, edges), solution);
  //   });
  // });
});
