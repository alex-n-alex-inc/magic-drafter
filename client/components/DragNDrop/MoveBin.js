import React from 'react'
import {DropTarget} from 'react-dnd'
import ItemTypes from './ItemTypes'

const binTarget = {
  drop(props, monitor) {
    const {onDrop} = props
    const {card, idx} = monitor.getItem()
    onDrop(card.cardData, idx)
  }
}

const collect = dndConnect => ({
  connectDropTarget: dndConnect.dropTarget()
})

const MoveBin = ({connectDropTarget, collectionType}) => {
  return connectDropTarget(
    <div className="move-bin">
      Move To {`${collectionType !== 'Deck' ? collectionType : 'Sideboard'}`}
    </div>
  )
}

export default DropTarget(ItemTypes.CARD, binTarget, collect)(MoveBin)
