import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container, Row} from 'react-bootstrap'
import {InlineCard} from './inlineCard'

class AllCards extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.deck) {
      return (
        <Container>
          {' '}
          {Object.keys(this.props.deck).map(cardName => {
            const card = this.props.deck[cardName]
            return (
              <Row>
                <InlineCard card={card} />
              </Row>
            )
          })}
        </Container>
      )
    }
  }
}

const mapStateToProps = state => {
  return {deck: state.deck}
}

export const ConnectedAllCards = connect(mapStateToProps)(AllCards)
