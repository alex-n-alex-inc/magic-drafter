import React, {Component} from 'react'
import querystring from 'query-string'
import {sortByCost} from '../store/cardOrder'
import AllCards from './allCards'
export default class WrappedAllCards extends Component {
  render() {
    const cardOrder = this.props.allCards
      ? sortByCost(Object.values(this.props.allCards))
      : []
    return <AllCards cardOrder={cardOrder} />
  }
}
