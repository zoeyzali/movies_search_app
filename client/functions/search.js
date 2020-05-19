const fetch = require( 'node-fetch' )

const tmdbKey = process.env.REACT_APP_TMDB_KEY
const baseURL = process.env.REACT_APP_BASE_URL

// search functionality *functions
exports.handler = async ( event, context ) => {
    console.log( context, "context?" )
    const query = event.queryStringParameters.query
    // if ( !query ) {
    //     return {
    //         statusCode: 500,
    //         body: 'Must define search term'
    //     }
    // }
    // let url = `${baseURL}/search/movie?language=en-US&page=1&include_adult=false&api_key=${tmdbKey}&query=${query}`
    // let response = await fetch( url )
    // let data = await response.json()
    // // let result = data.results
    // console.log( data, "data-lambda", tmdbKey, query )

    // return {
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     statusCode: 200,
    //     body: JSON.stringify( data )
    // }
    //     .catch( error => ( {
    //         statusCode: 422,
    //         body: String( error )
    //     } ) )

    return fetch( `${baseURL}/search/movie?language=en-US&page=1&include_adult=false&api_key=${tmdbKey}&query=${query}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    } )
        .then( response => response.json() )
        .then( data => {
            console.log( data, "data", query )
            return {
                statusCode: 200,
                body: JSON.stringify( data )
            }
        } )
        .catch( error => ( {
            statusCode: 422,
            body: String( error )
        } ) )
}

