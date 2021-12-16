import { createStore } from "vuex";

export default createStore({
  state: {
    startNode: false,
    endNode: false,
    obstacles: false,
  },
  mutations: {
    setStartNode(state, payload) {
      state.startNode = payload;
    },
    setEndNode(state, payload) {
      state.endNode = payload;
    },
    setObstacles(state, payload) {
      state.obstacles = payload;
    },
  },
  getters: {
    getStartNode(state) {
      return state.startNode;
    },
    getEndNode(state) {
      return state.endNode;
    },
    getObstacles(state) {
      return state.obstacles;
    },
  },
  actions: {},
  modules: {},
});
