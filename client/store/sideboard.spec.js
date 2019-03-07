import {expect} from 'chai'
import sideboard, {addSideboardCard, removeSideboardCard} from './sideboard'
import fakeStateTester from './fakeStoreStateTester'
import configureMockStore from 'redux-mock-store'

describe('Sideboard State', () => {
  let sideboardStore

  const sampleCard = {name: 'sampleCard'}
  const initialState = {sampleCard: {sampleCard, quantity: 1}}

  beforeEach(() => {
    sideboardStore = new fakeStateTester(initialState, sideboard)
  })

  afterEach(() => {
    sideboardStore.clearActions()
  })

  describe('addSideboardCard action', () => {
    it('adds given card to the sideboard state', () => {
      sideboardStore.dispatch(addSideboardCard({name: 'newCard'}))
      const addAction = sideboardStore.getLastAction()
      expect(addAction.type).to.be.equal('ADD_SIDEBOARD_CARD')
      expect(addAction.card.name).to.be.equal('newCard')
      expect(sideboardStore.state.newCard.quantity).to.be.equal(1)
    })
    it('increases the quantity of an existing card rather than adding new one', () => {
      sideboardStore.dispatch(addSideboardCard(sampleCard))
      expect(sideboardStore.state.sampleCard.quantity).to.be.equal(2)
    })
  })
  describe('removeSideboardCard action', () => {
    it('returns new sideboard state after removing the specified card', () => {
      sideboardStore.dispatch(removeSideboardCard(sampleCard))
      const actions = sideboardStore.getLastAction()
      expect(actions.type).to.be.equal('REMOVE_SIDEBOARD_CARD')
      expect(sideboardStore.state.sampleCard).to.be.equal(undefined)
    })
  })
})
