import React, {Component} from 'react'
import querystring from 'query-string'
import {sortByCost} from '../store/cardOrder'
import AllCards from './allCards'
export default class WrappedAllCards extends Component {
  componentDidMount() {
    console.log('mounting')
    //this.props.sortByCost(Object.values(this.props.allCards))
  }

  render() {
    // parse the query params to see if there was any filter or sort
    //const {filter, sort} = querystring.parse(this.props.location.search)
    // on default: no sort or filter
    //if (!filter && !sort) {
    //this.props.sortByCost(Object.values(this.props.allCards))
    //}
    const cardOrder = this.props.allCards
      ? sortByCost(Object.values(this.props.allCards))
      : []
    return <AllCards cardOrder={cardOrder} />
  }
}
