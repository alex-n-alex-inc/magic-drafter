import React from 'react'
import {DragDropContext} from 'react-dnd'
import TouchBackend from 'react-dnd-touch-backend'
import HTML5Backend from 'react-dnd-html5-backend'
import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default DragDropContext(
  TouchBackend({
    enableMouseEvents: true,
    enableHoverOutsideTarget: true
  })
)(App)
