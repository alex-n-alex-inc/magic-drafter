const initialState = {}

//ACTION NAMES
const SET_DECK = 'SET_DECK'
const ADD_DECK_CARD = 'ADD_DECK_CARD'
const REMOVE_DECK_CARD = 'REMOVE_DECK_CARD'
const CHANGE_CARD_QTY = 'CHANGE_CARD_QTY'
const EMPTY_DECK = 'EMPTY_DECK'

//ACTION CREATORS

export const setDeck = deck => {
  return {type: SET_DECK, deck}
}

export const addDeckCard = card => {
  return {type: ADD_DECK_CARD, card}
}

export const removeDeckCard = card => {
  return {type: REMOVE_DECK_CARD, card}
}

export const emptyDeck = () => {
  return {type: EMPTY_DECK}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_DECK:
      return action.deck
    case ADD_DECK_CARD:
      return {
        ...state,
        [action.card.name]: {
          cardData: action.card,
          quantity: state[action.card.name]
            ? state[action.card.name].quantity + 1
            : 1
        }
      }
    case REMOVE_DECK_CARD:
      const {[action.card.name]: toRemove, ...otherCards} = state
      const newState =
        toRemove.quantity <= 1
          ? otherCards
          : {
              ...otherCards,
              [toRemove.cardData.name]: {
                cardData: toRemove.cardData,
                quantity: toRemove.quantity - 1
              }
            }
      return newState
    case EMPTY_DECK:
      return {}
    default:
      return state
  }
}
