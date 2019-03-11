import React from 'react'
import {DropTarget} from 'react-dnd'
import ItemTypes from './ItemTypes'

const binTarget = {
  drop(props, monitor) {
    const {moveCard} = props
    const {card, idx} = monitor.getItem()
    moveCard(card.cardData)
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget()
})

const MoveBin = ({connectDropTarget, collectionType}) => {
  return connectDropTarget(
    <div className="move-bin">
      Move To <b />
      {`${collectionType === 'Deck' ? collectionType : 'Sideboard'}`}
    </div>
  )
}

export default DropTarget(ItemTypes.CARD, binTarget, collect)(MoveBin)
