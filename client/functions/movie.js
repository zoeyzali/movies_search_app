const fetch = require( 'node-fetch' )
const tmdbKey = process.env.REACT_APP_TMDB_KEY
const baseURL = process.env.REACT_APP_BASE_URL
// const accessToken = process.env.REACT_APP_ACCESS_TOKEN

exports.handler = async ( event, context ) => {
    const id = event.queryStringParameters.id
    return fetch( `${baseURL}/movie/${id}?api_key=${tmdbKey}&language=en-US&include_adult=false&append_to_response=videos,credits,keywords,release_dates` )
        .then( response => response.json() )
        .then( data => ( {
            statusCode: 200,
            body: JSON.stringify( data )
        } ) )
        .catch( error => ( {
            statusCode: 422,
            body: String( error )
        } ) )
}