const state = {
  user: null
}

const getters = {
  userId: (state) => {
    return state.user ? state.user.id : ''
  }
}

const mutations = {
  updateUserInfo (state, data) {
    state.user = data
  }
}

const actions = {
  async getUserInfo (context) {
    const user = await Promise.resolve({
      id: 1,
      name: 'jack'
    })
    context.commit('updateUserInfo', user)
    return user
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
