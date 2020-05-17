import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { MoviesContextProvider } from './context/MoviesContext'
import { HomePage } from './components/HomePage'
import { MoviePage } from './components/MoviePage'
import { Favorites } from './components/Favorites'

function App() {
    return (
        <Router>
            <MoviesContextProvider>
                <div className="container">
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/movies/:id" component={MoviePage} />
                    <Route exact path="/favorites" component={Favorites} />
                </div>
            </MoviesContextProvider>
        </Router>
    )
}

export default App
