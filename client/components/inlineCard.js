import React, {Component} from 'react'
import {Container, Card, Row, Col, Modal, Image} from 'react-bootstrap'
function getClassName(char) {
  if (char % 1 === 0) return `ms ms-${char} grey`
  else
    switch (char) {
      case 'U':
        return 'ms ms-u blue'
      case 'G':
        return 'ms ms-g green'
      case 'B':
        return 'ms ms-b black'
      case 'R':
        return 'ms ms-r red'
      case 'W':
        return 'ms ms-w white'
      default:
        return `ms ms-${char} grey`
    }
}

export default class InlineCard extends Component {
  constructor(props) {
    super(props)
    this.state = {show: false}
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.state.show ? this.setState({show: false}) : this.setState({show: true})
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
                  {card.cardData.mana_cost.split('').map((char, idx) => {
                    return <i key={idx} className={getClassName(char)} />
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
