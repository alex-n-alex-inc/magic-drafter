import React, {Component} from 'react'
import {Container, Card, Row, Col, Modal, Image} from 'react-bootstrap'

export class InlineCard extends Component {
  constructor(props) {
    super(props)
    this.state = {show: false}
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.state.show ? this.setState({show: false}) : this.setState({show: true})
    console.log('clicked')
  }

  render() {
    const {card} = this.props
    if (card) {
      return (
        <Container onClick={this.handleClick}>
          <Row>
            <Col xs={12} sm={12} md={12}>
              <Card>
                <Card.Text>
                  {' '}
                  {card.quantity > 1 ? (
                    <strong>
                      {card.cardData.name} x{card.quantity}
                    </strong>
                  ) : (
                    <strong>{card.cardData.name}</strong>
                  )}
                  {'  '}
                  {card.cardData.type_line}
                  {'   '}
                  {card.cardData.mana_cost.split('').map(char => {
                    switch (char) {
                      case 'U':
                        return <i className="ms ms-u blue" />
                      case 'G':
                        return <i className="ms ms-g green" />
                      case 'B':
                        return <i className="ms ms-b black" />
                      case 'R':
                        return <i className="ms ms-r red" />
                      case 'W':
                        return <i className="ms ms-w white" />
                      case '1':
                        return <i className="ms ms-1 grey" />
                      case '2':
                        return <i className="ms ms-2 grey" />
                      case '3':
                        return <i className="ms ms-3 grey" />
                      case '4':
                        return <i className="ms ms-4 grey" />
                      case '5':
                        return <i className="ms ms-5 grey" />
                      case '6':
                        return <i className="ms ms-6 grey" />
                      case '7':
                        return <i className="ms ms-7 grey" />
                      case '8':
                        return <i className="ms ms-8 grey" />
                      case '9':
                        return <i className="ms ms-9 grey" />
                      default:
                        break
                    }
                  })}
                </Card.Text>

                <Modal show={this.state.show} onHide={this.handleClick}>
                  <Row>
                    <Col xs={12} s={12} m={12}>
                      <Image
                        className="modal-Img"
                        src={card.cardData.image_uris.normal}
                      />
                    </Col>
                  </Row>
                </Modal>
              </Card>
            </Col>
          </Row>
        </Container>
      )
    }
  }
}
