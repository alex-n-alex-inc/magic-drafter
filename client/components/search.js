import {connect} from 'react-redux'
import {Button, Row, Col, Form, Container, Card} from 'react-bootstrap'
import React, {Component} from 'react'
import axios from 'axios'
import {addDeckCard} from '../store/deck'
import {addSideboardCard} from '../store/sideboard'

class Search extends Component {
  constructor() {
    super()
    this.state = {search: '', card: null, image: null, loading: false}
  }
  handleChange = event => {
    event.preventDefault()
    this.setState({search: event.target.value})
  }
  addToDeck = () => {
    this.props.addCardToDeck(this.state.card.data)
    this.setState({search: '', card: null})
  }
  addToSideboard = () => {
    this.props.addCardToSideboard(this.state.card.data)
    this.setState({search: '', card: null, loading: false})
  }
  search = async () => {
    this.setState({...this.state, loading: true})
    const searchTerm = this.state.search.split(' ').join('+')
    const card = await axios.get(`/api/cards/search/${searchTerm}`)
    console.log(card)
    this.setState({search: '', card, loading: false})
  }
  handleImage = async evt => {
    this.setState({...this.state, loading: true})
    const readFileAsDataURL = inputFile => {
      const temporaryFileReader = new FileReader()

      return new Promise((resolve, reject) => {
        temporaryFileReader.onerror = () => {
          temporaryFileReader.abort()
          reject(new DOMException('Problem parsing input file.'))
        }

        temporaryFileReader.onload = () => {
          resolve(temporaryFileReader.result)
        }
        temporaryFileReader.readAsDataURL(inputFile)
      })
    }
    event.preventDefault()

    let files = evt.target.files
    let file = files[0]

    if (files && file) {
      const ImageData = await readFileAsDataURL(file)

      const base64Image = ImageData.split(',', 2)[1]

      console.log('base 64 image data:', base64Image)
      this.setState({...this.state, image: base64Image, loading: false})
    }
    this.setState({...this.state, loading: false})

    //     console.log(event.target.files)
    //     const files = Array.from(event.target.files)

    //     const image = files[0]
    //     const reader = new FileReader();
    //  await reader.readAsText(image)
    //  const imageData = reader.result
    //    console.log('image data:', imageData)

    //     console.log('base64 image:', base64Image)
    // this.setState({...this.state, image: base64Image})
  }
  submitImage = async () => {
    try {
      this.setState({...this.state, loading: true})
      const response = await axios.post('/api/vision/image', {
        image: this.state.image
      })
      console.log('vision response', response.data)
      const fullText = response.data.responses[0].fullTextAnnotation.text.split(
        '\n'
      )
      console.log('fullText', fullText)
      this.setState({search: fullText[0], loading: false})
      this.search()
    } catch (err) {
      this.setState({...this.state, loading: false})
      console.error(err)
    }
  }
  render() {
    if (this.state.loading) {
      return (
        <div className="loader">
          <h1>loading</h1>
        </div>
      )
    } else if (this.state.card) {
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
          <Button onClick={this.addToSideboard}>Add to Sideboard</Button>
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
            <Button onClick={this.search}>Search by name</Button>
          </Row>
          <Row>
            <Form>
              <input type="file" accept="image/*" onChange={this.handleImage} />
            </Form>
            <Button onClick={this.submitImage}>Search by Image</Button>
          </Row>
        </Container>
      )
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCardToDeck: card => dispatch(addDeckCard(card)),
    addCardToSideboard: card => dispatch(addSideboardCard(card))
  }
}

export const ConnectedSearch = connect(null, mapDispatchToProps)(Search)
