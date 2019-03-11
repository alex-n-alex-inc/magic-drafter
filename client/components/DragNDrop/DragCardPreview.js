import React from 'react'
import {DragLayer} from 'react-dnd'
import InlineCard from '../inlineCard'

const collect = monitor => {
  const item = monitor.getItem()
  return {
    card: item && item.card,
    currentOffset: monitor.getDifferenceFromInitialOffset(),
    isDragging: monitor.isDragging()
  }
}

const getCardStyles = currentOffset => {
  if (!currentOffset) {
    return {
      display: 'none'
    }
  }
  const x = currentOffset.x
  const y = currentOffset.y
  const transform = `translate(${x}px, ${y}px)`

  return {
    pointerEvents: 'none',
    transform: transform,
    WebkitTransform: transform
  }
}

const DragCardPreview = ({card, currentOffset, isDragging}) => {
  return !isDragging ? null : (
    <div className="container" style={getCardStyles(currentOffset)}>
      <InlineCard card={card} />
    </div>
  )
}

export default DragLayer(collect)(DragCardPreview)
