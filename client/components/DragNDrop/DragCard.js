import React from 'react'
import ItemTypes from './ItemTypes'
import {DragSource} from 'react-dnd'
import InlineCard from '../inlineCard'

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      card: props.card
    }
  }
}

const cardCollector = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
})

const DragCard = ({
  card,
  id,

  connectDragSource,
  connectDragPreview,
  isDragging
}) => {
  const opacity = isDragging ? 0.5 : 1
  let WrappedInlineCard = (
    <div className="container" style={{opacity}}>
      <InlineCard card={card} id={id} />
    </div>
  )

  WrappedInlineCard = connectDragSource(WrappedInlineCard)
  WrappedInlineCard = connectDragPreview(WrappedInlineCard)
  return WrappedInlineCard
}

export default DragSource(ItemTypes.CARD, cardSource, cardCollector)(DragCard)
