import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import fetch from 'node-fetch'

const tmdbKey = process.env.REACT_APP_TMDB_KEY
const baseURL = process.env.REACT_APP_BASE_URL
const accessToken = process.env.REACT_APP_ACCESS_TOKEN
const posterUrl = `https://image.tmdb.org/t/p/w342`

export const HomePage = () => {
    const [query, setQuery] = useState( "" )
    const [movies, setMovies] = useState( [] )
    const [loading, setLoading] = useState( false )
    const [error, setError] = useState( false )
    const focusSearch = useRef( null )

    useEffect( () => {
        focusSearch.current.focus()
    }, [] )

    const handleSearch = async ( query, controller ) => {
        setLoading( true )
        if ( process.env.NODE_ENV === "development" ) {
            const response = await fetch( `${baseURL}/search/movie?language=en-US&page=1&include_adult=false&api_key=${tmdbKey}&query=${query}`,
                { signal: controller.signal } )
            const result = await response.json()
            // console.log( result, "search-result" )
            if ( result.results === [] || result.total_results === 0 ) {
                setLoading( false )
                return setError( true )
            }
            setError( false )
            setLoading( false )
            return ( result.results )
        } else {
            fetch( `/.netlify/functions/search?query=${query}` )
                // if ( !query ) return setMovies( [] )
                .then( res => res.json() )
                .then( data => {
                    if ( data.total_results === 0 || data.results === [] ) {
                        return setError( true )
                    }
                    setLoading( false )
                    setError( false )
                    setMovies( data.results )
                    // return ( data.results )
                } )
                .catch( error => console.log( `Query Errors ${error}` ) )
        }
    }

    const sleep = ( ms ) => {
        // setLoading( true )
        return new Promise( resolve => setTimeout( resolve, ms ) )
    }

    useEffect( () => {
        let currentQuery = true
        const controller = new AbortController()
        // const signal = controller.signal
        const loadMovies = async () => {
            if ( !query ) return setMovies( [] )
            await sleep( 500 )
            setError( false )
            if ( currentQuery ) {
                const movies = await handleSearch( query, controller )
                setMovies( movies )
                setLoading( false )
            }
        }
        loadMovies()
        return () => {
            currentQuery = false
            controller.abort()
        }
    }, [query] )

    useEffect( () => {
        if ( process.env.NODE_ENV === "development" ) {
            const fetchData = async () => {
                try {
                    const response = await fetch( `https://api.themoviedb.org/4/list/140481?language=en-US&page=1&include_adult=false&api_key=${tmdbKey}`, {
                        method: 'GET',
                        headers: {
                            Authorization: accessToken,
                        }
                    } )
                    const result = await response.json()
                    setMovies( result.results )
                } catch ( error ) {
                    console.log( error )
                }
            }
            fetchData()
        } else {
            fetch( '/.netlify/functions/movies' )
                .then( res => res.json() )
                .then( data => {
                    setMovies( data.results )
                } )
                .catch( error => console.log( error, "ERROR" ) )
        }
        // eslint-disable-next-line
    }, [] )

    return (
        <div className="home__wrapper">
            <div className="logo" />
            <div className="home__inner">
                <div className="search__wrapper">
                    <form>
                        <input
                            ref={focusSearch}
                            type="search"
                            placeholder="Search movies..."
                            name="query"
                            value={query}
                            className="search__input"
                            onChange={( e ) => setQuery(
                                e.target.value )}
                        />
                    </form>
                </div>
                <h3>Let's Get Us Some Movies</h3>
                <Link to="/favorites" className="linkTo__favs">
                    Go To
                </Link>
                {loading && !movies &&
                    <div className="loading__wrapper">
                        <h3>... La La Loading!</h3>
                    </div>
                }
                <div className="movies__list">
                    {error ? <div className="error__wrapper">
                        <h2>Oh noes, do you wanna try again?</h2>
                        <img src={require( "../assets/2.Illustrations/illustration-empty-state.png" )} alt="empty"
                        />
                    </div>
                        : ""
                    }
                    {movies && movies.length > 0
                        ? movies.map( movie => {
                            return (
                                <Link to={`/movies/${movie.id}`} key={movie.id} className="movies__card">
                                    <figure>
                                        {movie.poster_path && movie.poster_path !== null
                                            ? <img src={`${posterUrl}/${movie.poster_path}`} alt={movie.title} />
                                            : <img src={`https://dummyimage.com/w185x277.5/eee/555.png&text=No+images+found`}
                                                alt={movie.title} className="img__holder"
                                            />
                                        }
                                    </figure>
                                </Link>
                            )
                        } )
                        : ""
                    }
                </div>
            </div>
        </div>
    )
}