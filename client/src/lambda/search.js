const fetch = require( 'node-fetch' )

const tmdbKey = process.env.REACT_APP_TMDB_KEY
const baseURL = process.env.REACT_APP_BASE_URL

// search functionality *functions
exports.handler = async ( event, context, callback ) => {
    const query = event.queryStringParameters.query
    if ( !query ) {
        return {
            statusCode: 500,
            body: 'Must define search term'
        }
    }
    let url = `${baseURL}/search/movie?language=en-US&page=1&include_adult=false&api_key=${tmdbKey}&query=${query}`
    let response = await fetch( url )
    let data = await response.json()
    // let result = data.results
    console.log( data, "dataFUNC", response, "resultFUNC" )

    return {
        headers: {
            'Content-Type': 'application/json'
        },
        statusCode: 200,
        body: JSON.stringify( data )
    }
        .catch( error => console.log( "ERROR: ", error ) )
}

// async function getSearchResults( query ) {
// }