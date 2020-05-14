import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { HomePage } from './components/HomePage'
import { MoviePage } from './components/MoviePage'

function App() {
    return (
        <Router>
            <div className="container">
                <Route exact path="/" component={HomePage} />
                <Route exact path="/movies/:id" component={MoviePage} />
            </div>
        </Router>
    )
}

export default App
