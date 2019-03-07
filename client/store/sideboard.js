const ADD_SIDEBOARD_CARD = 'ADD_SIDEBOARD_CARD'
const REMOVE_SIDEBOARD_CARD = 'REMOVE_SIDEBOARD_CARD'
const EMPTY_SIDEBOARD = 'EMPTY_SIDEBOARD'

export const addSideboardCard = card => {
  return {type: ADD_SIDEBOARD_CARD, card}
}

export const removeSideboardCard = card => {
  return {type: REMOVE_SIDEBOARD_CARD, card}
}

export const emptySideboard = () => {
  return {type: EMPTY_SIDEBOARD}
}

export default function(state = {}, action) {
  switch (action.type) {
    case ADD_SIDEBOARD_CARD:
      return {
        ...state,
        [action.card.name]: {
          cardData: action.card,
          quantity: state[action.card.name]
            ? state[action.card.name].quantity + 1
            : 1
        }
      }
    case REMOVE_SIDEBOARD_CARD:
      const {[action.card.name]: _, ...newState} = state
      return newState
    case emptySideboard:
      return {}
    default:
      return state
  }
}
