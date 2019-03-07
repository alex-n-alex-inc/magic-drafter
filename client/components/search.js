import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {
  Button,
  Row,
  Col,
  Table,
  Image,
  Form,
  Container,
  Card
} from 'react-bootstrap'
import {addCardToDeck} from '../store/deck'
import React, {Component} from 'react'
import axios from 'axios'

class Search extends Component {
  constructor() {
    super()
    this.state = {search: '', card: null}
  }
  handleChange = event => {
    event.preventDefault()
    this.setState({search: event.target.value})
  }
  addToDeck = () => {
    this.props.addCard(this.state.card.data)
    this.setState({search: '', card: null})
  }
  search = async () => {
    const searchTerm = this.state.search.split(' ').join('+')
    const card = await axios.get(`/api/cards/search/${searchTerm}`)
    console.log(card)
    this.setState({search: '', card})
  }
  render() {
    if (this.state.card) {
      const card = this.state.card.data
      return (
        <Container>
          <Row>
            <Col xs={12} sm={4} md={6}>
              <Card.Img src={card.image_uris.normal} />
            </Col>
            <Col xs={12} sm={4} md={6}>
              <Card>
                <Card.Title>{card.name}</Card.Title>
                <Card.Text>Description: {card.oracle_text}</Card.Text>
              </Card>
            </Col>
          </Row>
          <Button onClick={this.addToDeck}>Add to Deck</Button>
        </Container>
      )
    } else {
      return (
        <Container>
          <Row>
            <Form>
              <Form.Group>
                <Form.Label>Card Name</Form.Label>
                <Form.Control
                  type="text"
                  name="searchTitle"
                  value={this.state.search}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form>
            <Button onClick={this.search}>Search</Button>
          </Row>
        </Container>
      )
    }
  }
}

const mapStateToProps = state => {
  return {deck: state.deck}
}

const mapDispatchToProps = dispatch => {
  return {
    addCard: card => dispatch(addCardToDeck(card))
  }
}

export const ConnectedSearch = connect(mapStateToProps, mapDispatchToProps)(
  Search
)
