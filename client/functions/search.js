const fetch = require( 'node-fetch' )

const tmdbKey = process.env.REACT_APP_TMDB_KEY
const baseURL = process.env.REACT_APP_BASE_URL

// serach functionality *functions
exports.handler = async ( event, context, callback ) => {
    const query = event.queryStringParameters.q || ""
    // const controller = new AbortController()
    return fetch( `${baseURL}/search/movie?language=en-US&page=1&include_adult=false&api_key=${tmdbKey}&query=${query}` )
        .then( response => response.json() )
        .then( json => {
            console.log( json, "jsonQuery lambda" )
            callback( null, {
                statusCode: 200,
                body: JSON.stringify( json.results )
            } )
        } )
        .catch( error => console.log( "ERROR: ", error ) )
}