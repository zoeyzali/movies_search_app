import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const tmdbKey = process.env.REACT_APP_TMDB_KEY
const baseURL = process.env.REACT_APP_BASE_URL
// console.log( tmdbKey, "destructured", baseURL )
const posterUrl = `https://image.tmdb.org/t/p/w342`

export const HomePage = () => {
    // const [count, setCount] = useState( 0 )
    // const [countInTimeout, setCountInTimeout] = useState( 0 )
    // const countRef = useRef( count )
    // countRef.current = count
    const [query, setQuery] = useState( "" )
    const [movies, setMovies] = useState( [] )
    const [loading, setLoading] = useState( false )
    const [error, setError] = useState( false )

    const focusSearch = useRef( null )

    useEffect( () => { focusSearch.current.focus() }, [] )

    const handleSubmit = async ( query, controller ) => {
        // e.preventDefault()
        const response = await fetch( `${baseURL}/search/movie?language=en-US&page=1&include_adult=false&api_key=${tmdbKey}&query=${query}`, { signal: controller.signal } )
        const result = await response.json()
        // console.log( result, "search-result" )
        if ( result.results === [] || result.total_results === 0 ) {
            // setLoading( false )
            return setError( true )
        }
        // setLoading( false )
        // setMovies( result.results )
        setError( false )
        return ( result.results )
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
            setError( true )
            if ( currentQuery ) {
                const movies = await handleSubmit( query, controller )
                // setLoading( false )
                setError( false )
                setMovies( movies )
            }
        }
        loadMovies()
        return () => {
            currentQuery = false
            controller.abort()
        }
        // setTimeout( () => {
        //     // setCountInTimeout( countRef.current )
        // }, 2000 )
        // // setCount( 5 )
        // setLoading( false )
        // // clearTimeout()
    }, [query] )


    /** const getJokes = async (query, controller) => {
const results = await fetch(<url>, { signal: controller.signal, <other options>) */
    return (
        <div className="home__wrapper">
            <div className="logo" />
            <div className="home__inner">
                <div className="search__wrapper">
                    <form>
                        <input ref={focusSearch} type="search" placeholder="Search movies..." name="query" value={query} className="search__input" onChange={( e ) => setQuery(
                            e.target.value )} />
                    </form>
                </div>
                <h3>Let's Get Us Some Movies</h3>
                {loading &&
                    <div className="loading__wrapper">
                        <h3>... la la loading!</h3>
                    </div>
                }

                <div className="movies__list">
                    {error ? <div className="error__wrapper">
                        <h2>Oh noes, do you wanna try again?</h2>
                        <img src={require( "../assets/2.Illustrations/illustration-empty-state.png" )} alt="empty" />
                    </div>
                        : ""
                    }
                    {movies && movies.length > 0 &&
                        movies.map( movie => {
                            return (
                                <Link to={`/movies/${movie.id}`} key={movie.id} className="movies__card">
                                    <figure>
                                        {movie.poster_path && movie.poster_path !== null ?
                                            <img src={`${posterUrl}/${movie.poster_path}`} alt={movie.title} />
                                            :
                                            <img src={`https://dummyimage.com/w185x277.5/eee/555.png&text=No+image`}
                                                alt={movie.title} className=" img__holder" />
                                        }
                                    </figure>
                                </Link>
                            )
                        } )
                    }
                </div>
            </div>
        </div>
    )
}

