const SET_ORDER = 'SET_ORDER'
const REDUCE_CARD = 'REDUCE_CARD'
const EXCHANGE_ORDER = 'EXCHANGE_ORDER'

export const setOrder = order => {
  return {type: SET_ORDER, order}
}

export const reduceCard = idx => {
  return {type: REDUCE_CARD, idx}
}

export const sortByCost = (cardList, direction = 1) => dispatch => {
  const sortedCardOrder = cardList.sort(
    (cardA, cardB) => (cardA.cardData.cmc - cardB.cardData.cmc) * direction
  )
  dispatch(setOrder(sortedCardOrder))
}

export default function(state = [], action) {
  switch (action.type) {
    case SET_ORDER:
      return action.order
    case REDUCE_CARD:
      const idx = action.idx
      const toReduce = state[idx]
      const newOrder =
        toReduce.quantity <= 1
          ? [...state.slice(0, idx), ...state.slice(idx + 1)]
          : [
              ...state.slice(0, idx),
              {...toReduce, quantity: toReduce.quantity - 1},
              ...state.slice(idx)
            ]
      return newOrder
    default:
      return state
  }
}
