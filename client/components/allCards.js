import React, {Component} from 'react'
import {Container, Row} from 'react-bootstrap'
import DragCard from './DragNDrop/DragCard'

export default class AllCards extends Component {
  render() {
    return (
      <Container>
        {' '}
        {this.props.cardOrder.map((card, idx) => {
          return (
            <Row key={card.cardData.name}>
              <DragCard card={card} id={idx} />
            </Row>
          )
        })}
      </Container>
    )
  }
}
