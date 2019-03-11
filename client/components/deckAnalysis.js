import React, {Component} from 'react'

import {connect} from 'react-redux'
import {Button, Row, Col, Form, Container, Card} from 'react-bootstrap'

import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryPie,
  VictoryGroup
} from 'victory'

class DeckAnalysis extends Component {
  constructor(props) {
    super(props)
    this.state = {
      standard: {
        creatures: [
          {mana: 2, quantity: 3},
          {mana: 3, quantity: 4},
          {mana: 4, quantity: 5},
          {mana: 5, quantity: 2},
          {mana: 6, quantity: 2}
        ],
        mana: [
          {type: 'white', quantity: 0},
          {type: 'green', quantity: 0},
          {type: 'blue', quantity: 0},
          {type: 'black', quantity: 0},
          {type: 'red', quantity: 0}
        ],
        stats: {
          enchantment: {mana: {}, quantity: 0},
          permanents: {mana: {}, quantity: 0},
          instant: {mana: {}, quantity: 0},
          sorcery: {mana: {}, quantity: 0},
          total: {mana: {}, quantity: 0}
        },

        types: [
          {type: 'Enchantment', quantity: 0},
          {type: 'Permanents', quantity: 0},
          {type: 'Instant', quantity: 0},
          {type: 'Sorcery', quantity: 0}
        ]
      }
    }
  }

  componentDidMount() {
    this.deckParser()
  }
  deckParser = () => {
    let manaState = [
      {type: 'white', quantity: 0},
      {type: 'green', quantity: 0},
      {type: 'blue', quantity: 0},
      {type: 'black', quantity: 0},
      {type: 'red', quantity: 0}
    ]
    if (this.props.deck) {
      const cardNames = Object.keys(this.props.deck)
      console.log('card names', cardNames)
      if (cardNames.length > 0) {
        const stats = {
          enchantment: {mana: {}, quantity: 0},
          permanents: {mana: {}, quantity: 0},
          instant: {mana: {}, quantity: 0},
          sorcery: {mana: {}, quantity: 0},
          total: {mana: {}, quantity: 0}
        }
        const data = []

        cardNames.forEach(cardName => {
          const card = this.props.deck[cardName]
          const type = card.cardData.type_line
          const mana = card.cardData.cmc

          const quantity = card.quantity
          console.log('card', card)
          console.log('type:', type)
          console.log('mana:', mana)

          if (type.includes('Enchantment')) {
            const statObj = stats.enchantment
            if (statObj.mana[mana]) {
              statObj.mana[mana] += quantity
            } else {
              statObj.mana[mana] = quantity
            }
            if (stats.total.mana[mana]) {
              stats.total.mana[mana] += quantity
            } else {
              stats.total.mana[mana] = quantity
            }
            stats.total.quantity += quantity
            statObj.quantity += quantity
          } else if (type.includes('Instant')) {
            const statObj = stats.instant
            if (statObj.mana[mana]) {
              statObj.mana[mana] += quantity
            } else {
              statObj.mana[mana] = quantity
            }
            if (stats.total.mana[mana]) {
              stats.total.mana[mana] += quantity
            } else {
              stats.total.mana[mana] = quantity
            }
            stats.total.quantity += quantity
            statObj.quantity += quantity
          } else if (type.includes('Sorcery')) {
            const statObj = stats.sorcery
            if (statObj.mana[mana]) {
              statObj.mana[mana] += quantity
            } else {
              statObj.mana[mana] = quantity
            }
            if (stats.total.mana[mana]) {
              stats.total.mana[mana] += quantity
            } else {
              stats.total.mana[mana] = quantity
            }
            stats.total.quantity += quantity

            statObj.quantity += quantity
          } else {
            const statObj = stats.permanents
            if (statObj.mana[mana]) {
              statObj.mana[mana] += quantity
            } else {
              statObj.mana[mana] = quantity
            }
            if (stats.total.mana[mana]) {
              stats.total.mana[mana] += quantity
            } else {
              stats.total.mana[mana] = quantity
            }
            stats.total.quantity += quantity
            statObj.quantity += quantity
          }

          const manaCols = card.cardData.mana_cost
          for (let i = 0; i < manaCols.length; i++) {
            switch (manaCols[i]) {
              case 'W':
                manaState[0].quantity++
                break
              case 'G':
                manaState[1].quantity++
                break
              case 'U':
                manaState[2].quantity++
                break
              case 'B':
                manaState[3].quantity++
                break
              case 'R':
                manaState[4].quantity++
                break
              default:
                break
            }
          }
        })

        const types = [
          {type: 'Enchantment', quantity: stats.enchantment.quantity},
          {type: 'Permanents', quantity: stats.permanents.quantity},
          {type: 'Instant', quantity: stats.instant.quantity},
          {type: 'Sorcery', quantity: stats.sorcery.quantity}
        ]

        console.log('stats', stats)
        const manaNums = Object.keys(stats.total.mana)
        manaNums.forEach(manaNum => {
          const entry = {mana: manaNum, quantity: stats.total.mana[manaNum]}
          data.push(entry)
        })

        this.setState({
          stats,
          data,
          types,
          standard: {...this.state.standard, mana: manaState},
          mana: manaState
        })
      }
    }
  }
  render() {
    let totalType = 0
    if (this.state.standard.mana) {
      const myTotal = this.state.standard.mana.reduce((accum, manaObj) => {
        return accum + manaObj.quantity
      }, 0)
      if (this.state.stats) {
        totalType = this.state.stats.total.quantity
      } else {
        totalType = this.state.standard.stats.total.quantity
      }

      return (
        <Container>
          <Row>
            <Col xs={12}>
              <Card>
                <Card.Title>Your Card Cost Distribution</Card.Title>
                <VictoryChart domainPadding={20}>
                  <VictoryAxis
                    // tickValues specifies both the number of ticks and where
                    // they are placed on the axis
                    label="mana costs"
                    tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                    tickFormat={x => `${x}`}
                  />
                  <VictoryAxis
                    dependentAxis
                    label="quantity"
                    // tickFormat specifies how ticks should be displayed
                    tickValues={[1, 2, 3, 4, 5]}
                    tickFormat={x => x}
                  />
                  <VictoryBar data={this.state.data} x="mana" y="quantity" />
                </VictoryChart>
              </Card>
            </Col>
            <Col xs={12}>
              <Card>
                <Card.Title>Your Mana Distribution</Card.Title>
                {/* 
              <VictoryChart domainPadding={20}>
              <VictoryAxis style={{ axis: {stroke: "none"} }} label = '' />
              <VictoryAxis dependent style={{ axis: {stroke: "none"} }} label = '' /> */}
                <VictoryPie
                  data={this.state.standard.mana}
                  y="quantity"
                  labels={datum =>
                    `${Math.floor(100 * (datum.quantity / myTotal))}%`
                  }
                  colorScale={['white', 'green', 'blue', 'black', 'red']}
                />
                {/* </VictoryChart> */}
              </Card>
            </Col>
            <Col xs={12}>
              <Card>
                <Card.Title>Your Type Distribution</Card.Title>

                {/* <VictoryChart domainPadding={20}>
              <VictoryAxis style={{ axis: {stroke: "none"} }} />
              <VictoryAxis dependent style={{ axis: {stroke: "none"} }} /> */}
                <VictoryPie
                  style={{
                    labels: {fill: 'darkgrey', fontSize: 14, fontWeight: 'bold'}
                  }}
                  labelRadius={90}
                  data={this.state.types}
                  x="type"
                  y="quantity"
                  labels={datum =>
                    `${Math.floor(100 * (datum.quantity / totalType))}% ${
                      datum.type
                    }`
                  }
                  colorScale={['white', 'green', 'blue', 'black', 'red']}
                />
                {/* </VictoryChart> */}
              </Card>
            </Col>

            <Col xs={12}>
              <Card>
                <Card.Title>Reference Cost Distribution</Card.Title>
                <VictoryChart domainPadding={20}>
                  <VictoryAxis
                    label="mana costs"
                    // tickValues specifies both the number of ticks and where
                    // they are placed on the axis
                    tickValues={[2, 3, 4, 5, 6]}
                    tickFormat={x => `${x}`}
                  />
                  <VictoryAxis
                    dependentAxis
                    label="quantity"
                    // tickFormat specifies how ticks should be displayed
                    tickValues={[1, 2, 3, 4, 5]}
                    tickFormat={x => x}
                  />
                  <VictoryBar
                    data={this.state.standard.creatures}
                    x="mana"
                    y="quantity"
                  />
                </VictoryChart>
              </Card>
            </Col>
          </Row>
        </Container>
      )
    } else {
      return 'No Cards yet!'
    }
  }
}

const mapStateToProps = state => {
  return {
    sideboard: state.sideboard,
    deck: state.deck
  }
}

export const ConnectedDeckAnalysis = connect(mapStateToProps)(DeckAnalysis)
