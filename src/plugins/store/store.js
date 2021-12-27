
function appendChild(data, children) {
  data.map((data)=> {
    if(data.id == children.parent_id) {
      data.children.push(children)
    } 
    appendChild(data.children, children)
  })
}

const DATA = 'data'

const store = { 
  state: {
    data: JSON.parse(localStorage.getItem(DATA)) || [] 
  },

  mutations: {
    SET_DATA: (state, payload) => {
      let data = Object.assign({}, payload)
      let flag = true
      if(data.parent_id) {
        appendChild(state.data, data)
        flag = false
      }
      if(flag) {
        state.data.push(data)
      } else {
        state.data = [...state.data]
      }
      localStorage.setItem(DATA, JSON.stringify(state.data))
    }
  },
  
  getters: {
    doneData: (state) => {
      return state.data
    }
  },

  actions: {
    setData: ({commit}, payload) => {
      commit('SET_DATA', payload)
    }
  }
}
export default store;