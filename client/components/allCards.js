import React, {Component} from 'react'
import {Container, Row} from 'react-bootstrap'
import {InlineCard} from './inlineCard'

export default class AllCards extends Component {
  render() {
    return (
      this.props.cardOrder.length && (
        <Container>
          {' '}
          {this.props.cardOrder.map((card, idx) => {
            return (
              <Row key={idx}>
                <InlineCard card={card} />
              </Row>
            )
          })}
        </Container>
      )
    )
  }
}
