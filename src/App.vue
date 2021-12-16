<template>
<div class="flex flex-col items-center h-screen bg-gray-800">
<h1 class="text-xl font-semibold text-gray-200 p-10">Pathfinder using Breath first search</h1>
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
    };
  },
  components: {
    GridContainer,
  },
  methods: {
    resetBoard() {
      this.componentKey += 1;
    },
  },
};
</script>

<style>
</style>
