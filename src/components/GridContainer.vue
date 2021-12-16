<template>
  <div class="flex items-center">
    <div class="flex flex-col items-center space-y-4">
      <button
        v-on:click="BSF"
        class="bg-green-800 text-white rounded-md shadow-md p-2 px-4"
      >
        Start
      </button>
      <button
        :disabled="!reachedEnd"
        v-on:click="showPath"
        :class="`${
          reachedEnd ? 'bg-yellow-400' : 'bg-gray-200 cursor-not-allowed '
        }text-white rounded-md shadow-md p-2 px-4`"
      >
        Path
      </button>
    </div>
    <div class="p-16 grid-container">
      <div
        v-for="coord in coordinates"
        key="coord"
        :class="`border bg-white border-gray-100 w-4 h-4 text-xs 
      ${coord == startNode && 'bg-green-500'}
      ${coord == endNode && 'bg-red-500'}`"
        :id="coord"
        @mouseover="(e) => markBlocked(e)"
        @click="selectNodes(coord)"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coordinates: [],
      shortestPath: [],
      startNode: "",
      path: Array.from(Array(30), () => new Array(50).fill(null)),
      endNode: "",
      adjMatrix: Array.from(Array(30), () => new Array(50).fill("*")),
      rows: 30,
      cols: 50,
      moveCount: 0,
      nodesLeftInLayer: 1,
      nodesNextInLayer: 0,
      visited: Array.from(Array(30), () => new Array(50)),
      rowsDirectionsVec: [-1, +1, 0, 0],
      colsDirectionsVec: [0, 0, +1, -1],
      rowQueue: [],
      colQueue: [],
      reachedEnd: false,
    };
  },
  created() {
    this.storeCoords();
  },
  methods: {
    selectNodes(coord) {
      if (!this.startNode) {
        this.startNode = coord;
      } else if (!this.endNode) {
        this.endNode = coord;
      } else {
        const sRow = Number(this.startNode.split("-")[0]);
        const sCol = Number(this.startNode.split("-")[1]);
        const dRow = Number(this.endNode.split("-")[0]);
        const dCol = Number(this.endNode.split("-")[1]);
        this.adjMatrix[sRow][sCol] = "s";
        this.adjMatrix[dRow][dCol] = "d";
      }
    },
    storeCoords() {
      for (let row = 0; row < 30; row++) {
        for (let col = 0; col < 50; col++) {
          this.coordinates.push(row + "-" + col);
        }
      }
    },
    markBlocked(e) {
      if (e.buttons === 1) {
        e.target.style.backgroundColor = "black";
        const r = Number(e.target.id.split("-")[0]);
        const c = Number(e.target.id.split("-")[1]);
        this.adjMatrix[r][c] = "#";
      }
    },
    BSF() {
      this.selectNodes();
      console.log(this.adjMatrix);
      const sRow = Number(this.startNode.split("-")[0]);
      const sCol = Number(this.startNode.split("-")[1]);
      this.rowQueue.push(sRow);
      this.colQueue.push(sCol);

      this.visited[sRow][sCol] = true;

      while (this.rowQueue.length > 0) {
        // polling first row and col from queues
        let r = this.rowQueue.shift();
        let c = this.colQueue.shift();

        if (this.adjMatrix[r][c] === "d") {
          this.reachedEnd = true;
          return this.move_count;
        }
        if (this.reachedEnd) {
          return this.move_count;
        }
        // explore neighbors
        this.exploreNeighbors(r, c);
        this.nodesLeftInLayer -= 1;
        if (this.nodesLeftInLayer === 0) {
          this.nodesLeftInLayer = this.nodesNextInLayer;
          this.nodesNextInLayer = 0;
          this.moveCount += 1;
        }
      }
    },
    exploreNeighbors(r, c) {
      for (let i = 0; i < 4; i++) {
        let rr = r + this.rowsDirectionsVec[i];
        let cc = c + this.colsDirectionsVec[i];

        if (!this.isValidNeighbor(rr, cc)) continue;

        this.rowQueue.push(rr);
        this.colQueue.push(cc);
        this.visited[rr][cc] = true;
        if (rr + "-" + cc !== this.endNode) {
          document.getElementById(`${rr}-${cc}`).classList.add("scale-150");
          setTimeout(() => {
            document.getElementById(`${rr}-${cc}`).style.backgroundColor =
              "#fabbfa";
            document
              .getElementById(`${rr}-${cc}`)
              .classList.remove("scale-150");
          }, 1);
        }
        this.nodesNextInLayer += 1;
        this.path[rr][cc] = r + "-" + c;
      }
    },

    isValidNeighbor(rr, cc) {
      if (rr < 0 || cc < 0) {
        return false;
      } else if (rr >= this.rows || cc >= this.cols) {
        return false;
      } else if (this.visited[rr][cc]) {
        return false; // already visited
      } else if (this.adjMatrix[rr][cc] === "#") {
        return false; // obstacle can't be visited
      } else {
        return true; // valid neighbor
      }
    },
    showPath() {
      let dRow = this.endNode.split("-")[0];
      let dCol = this.endNode.split("-")[1];
      let pos = this.path[dRow][dCol];
      while (true) {
        if (pos === null) break;
        let r = pos.split("-")[0];
        let c = pos.split("-")[1];
        pos = this.path[r][c];
        document.getElementById(r + "-" + c).style.backgroundColor = "purple";
      }
    },
  },
};
</script>

<style>
</style>