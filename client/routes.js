import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, ConnectedSearch} from './components'
import WrappedAllCards from './components/WrappedAllCards'
import {
  addSideboardCard,
  removeSideboardCard,
  emptySideboard
} from './store/sideboard'
import {addDeckCard, removeDeckCard, emptyDeck} from './store/deck'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/search" component={ConnectedSearch} />
        <Route
          path="/deck"
          render={() => (
            <WrappedAllCards
              allCards={this.props.deck}
              collectionType="Deck"
              moveCard={cardData => {
                this.props.addCardToSideboard(cardData)
                this.props.removeCardFromDeck(cardData)
              }}
            />
          )}
        />
        <Route
          path="/sideboard"
          render={() => (
            <WrappedAllCards
              allCards={this.props.sideboard}
              collectionType="Sideboard"
              moveCard={cardData => {
                this.props.addCardToDeck(cardData)
                this.props.removeCardFromSideboard(cardData)
              }}
            />
          )}
        />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    deck: state.deck,
    sideboard: state.sideboard
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    addCardToDeck(cardData) {
      dispatch(addDeckCard(cardData))
    },
    addCardToSideboard(cardData) {
      dispatch(addSideboardCard(cardData))
    },
    removeCardFromDeck(cardData) {
      dispatch(removeDeckCard(cardData))
    },
    removeCardFromSideboard(cardData) {
      dispatch(removeSideboardCard(cardData))
    },
    emptyDeckCollection() {
      dispatch(emptyDeck())
    },
    emptySideboardCollection() {
      dispatch(emptySideboard())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
