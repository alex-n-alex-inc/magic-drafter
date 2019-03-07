import axios from 'axios'
import store from './index'

const initialState = []

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

export const addCardToDeck = card => {
  return {type: ADD_DECK_CARD, card}
}

export const removeDeckCard = card => {
  return {type: REMOVE_DECK_CARD, card}
}

export const changeCardQuantity = (card, quantity) => {
  const cardItem = {card, quantity}
  return {type: CHANGE_CARD_QTY, cardItem}
}

export const emptyDeck = () => {
  return {type: EMPTY_DECK}
}

//Thunks

export const deck = (state = initialState, action) => {
  switch (action.type) {
    case SET_DECK:
      return action.deck
    case ADD_DECK_CARD:
      // if (state.length > 0){
      //     const matchCards = state.filter(
      //     card => card.data.arena_id === action.card.data.arena_id
      // )}
      return [...state, action.card]
    default:
      return state
  }
}
