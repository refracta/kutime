export const state = () => ({
  isActiveLeftDrawer: false
})

export const mutations = {
  toggleLeftDrawer (state) {
    state.isActiveLeftDrawer = !state.isActiveLeftDrawer
  },
  setLeftDrawer (state, value) {
    state.isActiveLeftDrawer = value
  }
}
