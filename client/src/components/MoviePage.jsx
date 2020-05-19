import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { MoviesContext } from '../context/MoviesContext'

const tmdbKey = process.env.REACT_APP_TMDB_KEY
const baseURL = process.env.REACT_APP_BASE_URL


export const MoviePage = ( { match } ) => {
    const { params: { id } } = match
    // console.log( id, match, "params match id" )
    const [movie, setMovie] = useState( {} )
    const [credits, setCredits] = useState()
    const posterUrl = `https://image.tmdb.org/t/p/w500`
    const { addToFavorites } = useContext( MoviesContext )

    useEffect( () => {
        const fetchMovieDetails = async () => {
            if ( process.env.NODE_ENV === "development" ) {
                const response = await fetch( `${baseURL}/movie/${id}?api_key=${tmdbKey}&language=en-US&include_adult=false&append_to_response=videos,credits,keywords,release_dates` )
                const result = await response.json()
                // console.log( result, "details response" )
                setMovie( result )
                setCredits( result.credits )
            } else {
                fetch( `/.netlify/functions/movie?id=${id}` )
                    .then( res => res.json() )
                    .then( data => {
                        // console.log( data, "details_netlifyFunction" )
                        setMovie( data )
                        setCredits( data.credits )
                    } )
                    .catch( error => console.log( error, "ERROR: MovieDetails" ) )
            }
        }
        fetchMovieDetails()
        // eslint-disable-next-line
    }, [id] )

    const mappCast = () => {
        let allCast = credits && credits.cast.map( ( cast ) => {
            let mainCast = cast && cast.order <= 5 ? <li key={cast.id}>{cast.name}</li> : ""
            // console.log( mainCast )
            return mainCast
        } )
        return allCast
    }

    const mappCrew = () => {
        const mainCrew = credits && credits.crew.map( crew => {
            // console.log( "crew job", crew.job, "and name", crew.name )
            let director = crew && crew.job === "Director" ? <li key={crew.id}>{crew.name}</li> : ""
            return director
        } )
        return mainCrew
    }

    const genresMapped = () => {
        let genresList = movie.genres && movie.genres.length > 0 && movie.genres.map( genre => {
            // console.log( genre.name, "genre mapped" )
            return genre && <li key={genre.id}>{genre.name}</li>
        } )
        return [genresList]
    }

    // one hot of mess!  // varied and incomplete data // to be revised
    const certificationsMapped = () => {
        const certificationsArr = movie.release_dates && movie.release_dates.results.map( ( result, i ) => {
            let usRating = result && result.iso_3166_1 === "US" && result.release_dates.length > 0 && result.release_dates[0].certification !== "" ? <label key={i} >{result.release_dates[0].certification !== "" ? result.release_dates[0].certification : result.release_dates[1].certification}</label> : ""
            // console.log( result.release_dates[0], "US rating" )
            return usRating
        } )
        // let localArr = ['NC-17', 'R', 'PG', 'PG-13', 'NR']
        // console.log( movie.release_dates, "releaseDates" )
        return certificationsArr
    }

    /** just converting tmdb's own rating into % since it doesn't provide rottentomato or imdb-ratings */
    const getRatingPercentage = () => {
        let maxRating = movie.vote_count * 10
        let totalRatings = movie.vote_average * movie.vote_count
        let percentage = Math.floor( Number( ( totalRatings / maxRating ) * 100 ) ? Math.floor( ( totalRatings / maxRating ) * 100 ) : 0 )
        // console.log( "maxRating", maxRating, "totalRatings", totalRatings, "percentage: ", percentage )
        return percentage
    }

    const [favoriteClicked, setFavoriteClicked] = useState( false )


    const toggleFavoriteBtn = ( id ) => {
        // const filtered = favorited.filter( movie => movie.id === id )
        addToFavorites( movie )
        // console.log( filtered, "filtered" )
        setFavoriteClicked( favoriteClicked => !favoriteClicked )
    }


    return (
        <React.Fragment>
            {movie &&
                <div key={movie.id} className="movie__wrapper">
                    <Link to="/">
                        <div className="logo" />
                    </Link>
                    <div className="inner__wrapper">
                        <div className="movie__info_left">
                            <Link to="/">
                                <div className="back__arrow">
                                </div>
                            </Link>
                            <div className="misc__info">
                                <span>{movie.runtime} min</span>
                                <span>{movie.release_date && movie.release_date.slice( 0, 4 )}</span>
                                <span>{movie.original_title}</span>
                                <span>{movie.original_language && movie.original_language.toUpperCase()}</span>
                                {certificationsMapped()}
                            </div>
                            <h1>{movie.title}</h1>
                            <div className="btn__row">
                                <label className="imdb__svg">
                                    {movie.vote_average}/10{" "}
                                </label>
                                <label className="rottenTomato__svg">
                                    {getRatingPercentage()}%
                                </label>
                                <button className={`${!favoriteClicked ? "heart__svg" : "active"}`} onClick={() => toggleFavoriteBtn()
                                }>{`${!favoriteClicked ? "ADD TO FAVS" : "ADDED"}`}
                                </button>
                            </div>
                            <div className="text__content">
                                <h3>PLOT</h3>
                                <p>
                                    {movie.overview}
                                </p>
                            </div>
                            <div className="castncrew__wrapper">
                                <div className="cast">
                                    <h3>CAST</h3>
                                    {credits && mappCast()}
                                </div>
                                <div className="genre">
                                    <h3>GENRE</h3>
                                    {movie && genresMapped()}
                                </div>
                                <div className="director">
                                    <h3>DIRECTOR</h3>
                                    {credits && mappCrew() ? credits && mappCrew() : "NA"}
                                </div>
                            </div>
                        </div>
                        <div className="movie__info_right">
                            <figure>
                                {movie.poster_path && movie.poster_path !== null ?
                                    <img src={`${posterUrl}/${movie.poster_path}`} alt={movie.title} /> :
                                    <img src={`https://dummyimage.com/w300x400/eee/555.png&text=image+NA`}
                                        alt={movie.title} className="img__holder"
                                    />
                                }
                            </figure>
                        </div>
                    </div>
                </div>
            }
        </React.Fragment>
    )
}

