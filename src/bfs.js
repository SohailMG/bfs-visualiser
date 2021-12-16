const rows = 30,
  cols = 30;
const source = {
  r: 1,
  c: 1,
};
let move_count = 0;
let nodes_left_in_layer = 1;
let nodes_in_next_layer = 0;
let visited = Array.from(Array(rows), () => new Array(cols));
let rowsDirectionsVec = [-1, +1, 0, 0];
let colsDirectionsVec = [0, 0, +1, -1];
let rowQueue = [];
let colQueue = [];
let reachedEnd = false;

function createMaze() {
  return [
    ["#", "*", "#", "*", "*", "s"],
    ["*", "#", "*", "*", "*", "*"],
    ["#", "*", "*", "*", "*", "*"],
    ["*", "*", "d", "#", "*", "*"],
    ["#", "*", "#", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "*"],
  ];
}
// main algorithm
function BSF(maze) {
  rowQueue.push(source.r);
  colQueue.push(source.c);

  visited[source.r][source.c] = true;

  while (rowQueue.length > 0) {
    // polling first row and col from queues
    let r = rowQueue.shift();
    let c = colQueue.shift();
    if (maze[r][c] == "d") {
      reachedEnd = true;
      return move_count;
    }
    if (reachedEnd) {
      return move_count;
    }
    // explore neighbors
    exploreNeighbors(r, c, maze);
    nodes_left_in_layer -= 1;
    if (nodes_left_in_layer === 0) {
      nodes_left_in_layer = nodes_in_next_layer;
      nodes_in_next_layer = 0;
      maze[r][c] = "¢";
      move_count += 1;
    }
  }
}

function exploreNeighbors(r, c, maze) {
  for (let i = 0; i < 4; i++) {
    let rr = r + rowsDirectionsVec[i];
    let cc = c + colsDirectionsVec[i];

    if (!isValidNeighbor(rr, cc, maze)) continue;

    rowQueue.push(rr);
    colQueue.push(cc);
    visited[rr][cc] = true;
    nodes_in_next_layer += 1;
  }
}

function isValidNeighbor(rr, cc, maze) {
  if (rr < 0 || cc < 0) {
    return false;
  } else if (rr >= rows || cc >= cols) {
    return false;
  } else if (visited[rr][cc]) {
    return false; // already visited
  } else if (maze[rr][cc] === "#") {
    return false; // obstacle can't be visited
  } else {
    return true; // valid neighbor
  }
}

// MAIN RUNNER
function findPath() {
  let maze = createMaze();
  const moves = BSF(maze);
  console.log(maze, moves);
}
