class fakeStoreStateTester {
  constructor(initialState, reducer) {
    this.state = initialState
    this.actions = []
    this.reducer = reducer
  }

  getLastAction() {
    if (this.actions.length <= 0)
      throw new Error('There was no action thrown on this state')
    return this.actions[this.actions.length - 1]
  }

  getState() {
    return this.state
  }

  clearActions() {
    this.actions = []
  }

  dispatch(action) {
    this.actions.push(action)
    this.state = this.reducer(this.state, action)
  }
}

export default fakeStoreStateTester
