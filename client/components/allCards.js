import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Form,
  FormControl
} from 'react-bootstrap'

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
            const cardData = this.props.deck[cardName].cardData
            const quantity = this.props.deck[cardName].quantity
            return (
              <Row>
                <Col xs={6} sm={4} md={6}>
                  <Card.Img src={cardData.image_uris.normal} />
                </Col>
                <Col xs={6} sm={4} md={6}>
                  <Card>
                    <Card.Title>{cardData.name}</Card.Title>
                    <Card.Text>Description: {cardData.oracle_text}</Card.Text>
                    <Card.Text>Quantity: {quantity}</Card.Text>
                  </Card>
                </Col>
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
