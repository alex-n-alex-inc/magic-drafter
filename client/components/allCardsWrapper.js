import React, {Component} from 'react'
import querystring from 'query-string'
import {connect} from 'react-redux'
import {sortByCost} from '../store/cardOrder'
import AllCards from './allCards'

// connects either deck or sideboard to allcards view prop
export default function() {
  class WrappedAllCards extends Component {
    componentDidMount() {
      console.log('mounting')
      this.props.sortByCost(Object.values(this.props.allCards))
    }

    render() {
      // parse the query params to see if there was any filter or sort
      //const {filter, sort} = querystring.parse(this.props.location.search)
      // on default: no sort or filter
      //if (!filter && !sort) {
      //this.props.sortByCost(Object.values(this.props.allCards))
      //}
      return <AllCards cardOrder={this.props.cardOrder} />
    }
  }

  const mapState = state => ({
    cardOrder: state.cardOrder
  })

  const mapDispatch = dispatch => ({
    sortByCost: cardArray => dispatch(sortByCost(cardArray))
  })

  return connect(mapState, mapDispatch)(WrappedAllCards)
}
