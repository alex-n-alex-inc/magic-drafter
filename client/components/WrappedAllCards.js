import React, {Component} from 'react'
import {connect} from 'react-redux'
import {sortByCost} from '../store/cardOrder'
import AllCards from './allCards'

class WrappedAllCards extends Component {
  componentDidMount() {
    this.props.sortOrderbyCMC(Object.values(this.props.allCards))
  }

  componentDidUpdate(lastProps) {
    console.log(this.props.session)
    lastProps.allCards !== this.props.allCards &&
      this.props.sortOrderbyCMC(Object.values(this.props.allCards))
  }

  render() {
    return <AllCards cardOrder={this.props.cardOrder} />
  }
}

const mapState = state => ({
  cardOrder: state.cardOrder
})

const mapDispatch = dispatch => ({
  sortOrderbyCMC: (cardsArr, direction) =>
    dispatch(sortByCost(cardsArr, direction))
})

export default connect(mapState, mapDispatch)(WrappedAllCards)
