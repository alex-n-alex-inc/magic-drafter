import React, {Component} from 'react'

import DragCard from './DragNDrop/DragCard'
import {connect} from 'react-redux'
import {Button, Row, Col, Form, Container, Card} from 'react-bootstrap'

import axios from 'axios'
import {addDeckCard} from '../store/deck'
import {addSideboardCard} from '../store/sideboard'
import {VictoryBar, VictoryChart, VictoryAxis} from 'victory'

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
        ]
      }
    }
  }
  componentDidMount() {
    this.deckParser()
  }
  deckParser = () => {
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
        })
        console.log('stats', stats)
        const manaNums = Object.keys(stats.total.mana)
        manaNums.forEach(manaNum => {
          const entry = {mana: manaNum, quantity: stats.total.mana[manaNum]}
          data.push(entry)
        })

        this.setState({stats, data})
      }
    }
  }
  render() {
    return (
      <Container>
        <Row>
          <h1>Your Card Distribution</h1>
          <VictoryChart domainPadding={20}>
            <VictoryAxis
              // tickValues specifies both the number of ticks and where
              // they are placed on the axis
              tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
              tickFormat={x => `${x} mana`}
            />
            <VictoryAxis
              dependentAxis
              // tickFormat specifies how ticks should be displayed
              tickValues={[1, 2, 3, 4, 5]}
              tickFormat={x => x}
            />
            <VictoryBar data={this.state.data} x="mana" y="quantity" />
          </VictoryChart>

          <h1>Reference Distribution</h1>
          <VictoryChart domainPadding={20}>
            <VictoryAxis
              // tickValues specifies both the number of ticks and where
              // they are placed on the axis
              tickValues={[2, 3, 4, 5, 6]}
              tickFormat={x => `${x} mana`}
            />
            <VictoryAxis
              dependentAxis
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
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    sideboard: state.sideboard,
    deck: state.deck
  }
}

export const ConnectedDeckAnalysis = connect(mapStateToProps)(DeckAnalysis)
