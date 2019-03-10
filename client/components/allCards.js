import React, {Component} from 'react'
import {Container, Row} from 'react-bootstrap'
import {InlineCard} from './inlineCard'

export default class AllCards extends Component {
  render() {
    return (
      this.props.cardOrder.length && (
        <Container>
          {' '}
          {this.props.cardOrder.map(card => {
            return (
              <Row key={card.cardData.name}>
                <InlineCard card={card} />
              </Row>
            )
          })}
        </Container>
      )
    )
  }
}
