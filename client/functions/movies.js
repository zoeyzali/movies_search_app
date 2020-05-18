const fetch = require( 'node-fetch' )

const tmdbKey = process.env.REACT_APP_TMDB_KEY
const baseURL = process.env.REACT_APP_BASE_URL
const accessToken = process.env.REACT_APP_ACCESS_TOKEN

exports.handler = async ( event, context ) => {
    return fetch( `https://api.themoviedb.org/4/list/140481?language=en-US&page=1&include_adult=false&api_key=${tmdbKey}`, {
        method: 'GET',
        headers: {
            Authorization: accessToken,
            'Accept': 'application/json'
        }
    } )
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


// serach functionality *functions
exports.handler = async ( event, context, callback ) => {
    const query = event.queryStringParameters.query
    return fetch( `${baseURL}/search/movie?language=en-US&page=1&include_adult=false&api_key=${tmdbKey}&query=${query}`, { signal: controller.signal } )
        .then( json => {
            console.log( json, "json query" )
            callback( null, {
                statusCode: 200,
                body: JSON.stringify( json.results )
            } )
        } )
        .catch( error => console.log( "ERROR: ", error ) )
}

    // try {
    //     const response = await fetch( `https://api.themoviedb.org/4/list/140481?language=en-US&page=1&include_adult=false&api_key=${tmdbKey}`, {
    //         method: 'GET',
    //         headers: {
    //             authorization: accessToken,
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //             "Access-Control-Allow-Origin": "*",
    //             "Access-Control-Allow-Headers": "Content-Type"
    //         },
    //     } )
    //     const result = await response.json()
    //     // console.log( result, "result functions" )
    //     return callback( null, {
    //         statusCode: 200,
    //         body: JSON.stringify( result )
    //     } )
    // } catch ( error ) {
    //     console.log( error, "error" )
    //     return callback( error, {
    //         statusCode: 422,
    //         body: JSON.stringify( { error: error } )
    //     } )
    // }
