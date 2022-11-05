export default {
  state: {
    tasks: []
  },
  getters: {
    getTasks (state) {
      return state.tasks
    }
  },
  mutations: {
    addTask (state, payload) {
      state.tasks.push(payload)
    },
    async updateTask (state, payload) {
      const index = state.tasks.findIndex(task => task.index === payload)
      state.tasks[index].done = !state.tasks[index].done
    },
    deleteTask (state, payload) {
      const index = state.tasks.findIndex(task => task.index === payload)
      state.tasks.splice(index, 1)
    }
  },
  actions: {
    async addTask ({ commit }, payload) {
      commit('addTask', payload)
    },
    async updateTask ({ commit }, payload) {
      commit('updateTask', payload)
    },
    async deleteTask ({ commit }, payload) {
      console.log(payload)
      commit('deleteTask', payload)
    }
  }
}
