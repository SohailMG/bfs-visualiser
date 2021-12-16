<template>
<div class="flex flex-col items-center h-screen bg-gray-800">
  <div>
      <h1 class="text-xl font-semibold text-yellow-500 p-10">Pathfinder using Breath first search</h1>
      <ol class="list-decimal">

      <li :class="`text-gray-100 ${$store.state.startNode && ' line-through text-gray-500'}` ">Pick a starting point</li>
      <li :class="`text-gray-100 ${$store.state.endNode   && ' line-through text-gray-500'}` ">Pick a ending point </li>
      <li :class="`text-gray-100 ${$store.state.obstacles && ' line-through text-gray-500' }` ">Hold right-click and drag mouse to create obstacles</li>
      </ol>
  </div>
  <div class="flex items-center">
    <button
      v-on:click="resetBoard"
      class="bg-red-800 text-white rounded-md shadow-md p-2 px-4 m-20"
    >
      reset
    </button>
    <grid-container :key="componentKey" />
  </div>
</div>
</template>

<script>
import GridContainer from "./components/GridContainer.vue";

export default {
  name: "App",
  data() {
    return {
      componentKey: 0,
      startSelected:this.$store.getters.getStartNode,
      endSelected:this.$store.getters.getEndNode,
      obstacleSelected:this.$store.getters.getObstacles,
    };
  },
  components: {
    GridContainer,
  },
  methods: {
    resetBoard() {
      this.componentKey += 1;
       this.$store.commit("setStartNode", false);
       this.$store.commit("setEndNode", false);
       this.$store.commit("setObstacles", false);
    },
  },
};
</script>

<style>
</style>
