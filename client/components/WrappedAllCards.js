import React, {Component} from 'react'
import {connect} from 'react-redux'
import {sortByCost, reduceCard} from '../store/cardOrder'
import AllCards from './allCards'
import DragCardPreview from './DragNDrop/DragCardPreview'
import MoveBin from './DragNDrop/MoveBin'

class WrappedAllCards extends Component {
  componentDidMount() {
    this.props.sortOrderbyCMC(Object.values(this.props.allCards))
  }

  componentDidUpdate(lastProps) {
    lastProps.collectionType !== this.props.collectionType &&
      this.props.sortOrderbyCMC(Object.values(this.props.allCards))
  }

  render() {
    return this.props.cardOrder.length ? (
      <div className="container">
        <AllCards cardOrder={this.props.cardOrder} />
        <DragCardPreview />
        <MoveBin
          collectionType={this.props.collectionType}
          moveCard={this.props.moveCard}
          onDrop={this.props.handleDrop}
        />
      </div>
    ) : (
      'No Cards'
    )
  }
}

const mapState = state => ({
  cardOrder: state.cardOrder
})

const mapDispatch = (dispatch, ownProps) => ({
  sortOrderbyCMC: (cardsArr, direction) =>
    dispatch(sortByCost(cardsArr, direction)),
  handleDrop: (cardData, idx) => {
    ownProps.moveCard(cardData)
    dispatch(reduceCard(idx))
  }
})

export default connect(mapState, mapDispatch)(WrappedAllCards)
