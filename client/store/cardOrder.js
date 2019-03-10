const SET_ORDER = 'SET_ORDER'
const SORT_BY_COLOR = 'SORT_BY_COLOR'
const SORT_BY_COST = 'SORT_BY_COST'

export const setOrder = order => {
  return {type: SET_ORDER, order}
}

export const sortByCost = cardList => {
  return cardList.sort(
    (cardA, cardB) => cardA.cardData.cmc - cardB.cardData.cmc
  )
}

export default function(state = [], action) {
  switch (action.type) {
    case SET_ORDER:
      return action.order
    default:
      return state
  }
}
