import React, {Component} from 'react'
import {Container, Row} from 'react-bootstrap'
import InlineCard from './inlineCard'

export default class AllCards extends Component {
  render() {
    return (
      <Container>
        {' '}
        {this.props.cardOrder.map((card, idx) => {
          return (
            <Row key={card.cardData.name}>
              <InlineCard card={card} id={idx} />
            </Row>
          )
        })}
      </Container>
    )
  }
}
