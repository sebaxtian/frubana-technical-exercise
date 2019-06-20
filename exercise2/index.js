const readline = require("readline");

// Number of nodes
var n = 0;
// Color of nodes
var colors = [];
// Edges
var edges = [];

// Readline Interface STDIn STDOut
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Read input user
rl.question("Number of nodes: ", answer => {
  // Number of nodes
  n = answer;
  rl.question("Colors of nodes: ", async answer => {
    colors = answer.split(" ");
    let i = 1;
    while (i < n) {
      let edge = await new Promise((resolve, reject) => {
        rl.question("Edge " + i + ": ", answer => {
          resolve(answer);
        });
      });
      edges.push(edge.split(" "));
      i++;
    }
    // Print input user
    console.log("\nInput");
    console.log(n);
    console.log(colors);
    console.log(edges);
    console.log("");
    rl.close();
    // Call main function
    main();
  });
});

function solveProblem(n, colors, edges) {
  let solution = [];

  // console.log("edges: ", edges);
  for (let i = 1; i <= n; i++) {
    const paths = getPathsNode(i + "", edges, colors);
    // console.log("paths[" + i + "]: ", paths);
    // [ [ '1', '2' ], [ '1', '5' ], [ '1', '2', '3' ], [ '1', '2', '4' ] ]
    // [ [ '1', '2' ], [ '1', '3' ], [ '1', '2', '3' ], [ '1', '2', '2' ] ]
    const sumI = countDiffColors(paths);
    // console.log("sum[" + i + "]: ", sumI);
    solution.push(sumI);
  }

  // console.log('solution: ', solution);

  return solution;
}

function countDiffColors(paths) {
  let sum = 1;
  while (paths.length > 0) {
    const path = paths.pop();
    const pathI = [];
    for (let i = 0; i < path.length; i++) {
      const exist = pathI.includes(path[i]);
      if (!exist) {
        pathI.push(path[i]);
      }
    }
    sum += pathI.length;
  }
  return sum;
}

function getPathsNode(node, edges, colors) {
  let paths = [[colors[node - 1]]];
  // let paths = [[node]];
  while (edges.length > 0) {
    let pathI = [];
    const edgesI = [];
    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i];
      const nodeI = getNode(node, edge);
      if (nodeI != -1) {
        pathI.push(colors[nodeI - 1]);
        // pathI.push(nodeI);
      } else {
        edgesI.push(edge);
      }
    }
    edges = edgesI;
    paths.push(pathI);
    node = pathI[0];
  }

  // paths[1]:  [ [ '1' ], [ '2', '5' ], [ '3', '4' ] ]
  // ruta[1]: [ [ '1', '2' ], [ '1', '5' ], [ '1', '2', '3' ], [ '1', '2', '4' ] ]
  // paths[2]:  [ [ '2' ], [ '1', '3', '4' ], [ '5' ] ]
  // ruta[2]: [ [ '2', '1' ], [ '2', '3' ], [ '2', '4' ], [ '2', '1', '5' ] ]
  // paths[3]:  [ [ '3' ], [ '2' ], [ '1', '4' ], [ '5' ] ]
  // ruta[3]:  [ [ '3', '2' ], [ '3', '2', '1' ], [ '3', '2', '4' ], [ '3', '2', '1', '5' ] ]
  // paths[4]:  [ [ '4' ], [ '2' ], [ '1', '3' ], [ '5' ] ]
  // paths[5]:  [ [ '5' ], [ '1' ], [ '2' ], [ '3', '4' ] ]

  let pathsI = [];
  let head = paths[0];
  for (let j = 1; j < paths.length; j++) {
    let tail = paths[j];
    if (tail.length > 0 && j > 1) {
      head = head.concat(paths[j - 1][0]);
    }
    const pathJ = getPath(head, tail);
    pathsI = pathsI.concat(pathJ);
  }
  // console.log('pathsI: ', pathsI);
  return pathsI;
}

function getPath(head, tail) {
  let list = [];
  if (tail.length > 0) {
    for (let i = 0; i < tail.length; i++) {
      list.push(head.concat(tail[i]));
    }
  }
  return list;
}

function getNode(node, edge) {
  if (edge[0] == node) {
    return edge[1];
  }
  if (edge[1] == node) {
    return edge[0];
  }
  return -1;
}

/**
 * Main Function
 */
function main() {
  let response = solveProblem(n, colors, edges);
  // Print output
  console.log("\nOutput");
  for (let i = 0; i < response.length; i++) {
    console.log(response[i]);
  }
  console.log("");
}

module.exports = solveProblem;
