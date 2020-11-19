import React, { useContext, useEffect } from 'react'
import { MoviesContext } from '../context/MoviesContext'
import { Link } from 'react-router-dom'

export const Favorites = () => {
    const posterUrl = `https://image.tmdb.org/t/p/w342`
    const { favorited, removeFavorite } = useContext( MoviesContext )
    useEffect( () => { }, [favorited] )

    return (
        <div className="favorites__wrapper">
            <Link to="/">
                <div className="logo" />
            </Link>
            <Link to="/">
                <div className="back__arrow">
                </div>
            </Link>
            <div className="favorites__inner">
                <h1>Favorites</h1>
                <div className="favorites__list">
                    {favorited && favorited.length > 0
                        ? favorited.map( favoriteItem => {
                            return (
                                <div key={favoriteItem.id} className="favorites__card">
                                    <Link to={`/movies/${favoriteItem.id}`}>
                                        <figure>
                                            {favoriteItem.poster_path && favoriteItem.poster_path !== null
                                                ? <img src={`${posterUrl}/${favoriteItem.poster_path}`} alt={favoriteItem.title} />
                                                : <img src={`https://dummyimage.com/w185x277.5/eee/555.png&text=No+images`}
                                                    alt={favoriteItem.title} className="img__holder" />
                                            }
                                        </figure>
                                    </Link>
                                    <button onClick={() => removeFavorite( favoriteItem.id )} className="heart__svg extra__btn"></button>
                                </div>
                            )
                        } )
                        : <p>
                            Seems you haven't `favorited` any films yet.
                    {" "}
                            <Link to="/" className="linkTo__home">
                                Click here to add some.
                    </Link>
                        </p>
                    }
                </div>
            </div>
        </div>
    )
}