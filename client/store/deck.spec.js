import {expect} from 'chai'
import deckReducer, {addDeckCard, removeDeckCard} from './deck'
import fakeStateTester from './fakeStoreStateTester'

describe('Sideboard State', () => {
  let deckStore

  const sampleCard = {name: 'sampleCard'}
  const initialState = {sampleCard: {sampleCard, quantity: 1}}

  beforeEach(() => {
    deckStore = new fakeStateTester(initialState, deckReducer)
  })

  afterEach(() => {
    deckStore.clearActions()
  })

  describe('addDeckCard action', () => {
    it('adds given card to the deck state', () => {
      deckStore.dispatch(addDeckCard({name: 'newCard'}))
      const addAction = deckStore.getLastAction()
      expect(addAction.type).to.be.equal('ADD_DECK_CARD')
      expect(addAction.card.name).to.be.equal('newCard')
      expect(deckStore.state.newCard.quantity).to.be.equal(1)
    })
    it('increases the quantity of an existing card rather than adding new one', () => {
      deckStore.dispatch(addDeckCard(sampleCard))
      expect(deckStore.state.sampleCard.quantity).to.be.equal(2)
    })
  })
  describe('removeDeckCard action', () => {
    it('returns new deck state after removing the specified card', () => {
      deckStore.dispatch(removeDeckCard(sampleCard))
      const actions = deckStore.getLastAction()
      expect(actions.type).to.be.equal('REMOVE_DECK_CARD')
      expect(deckStore.state.sampleCard).to.be.equal(undefined)
    })
  })
})
