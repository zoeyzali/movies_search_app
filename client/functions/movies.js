const fetch = require( 'node-fetch' )

exports.handler = async ( event, context, callback ) => {
    const tmdbKey = process.env.REACT_APP_TMDB_KEY
    const baseURL = process.env.REACT_APP_BASE_URL
    const accessToken = process.env.REACT_APP_ACCESS_TOKEN
    try {
        const response = await fetch( `https://api.themoviedb.org/4/list/140481?language=en-US&page=1&include_adult=false&api_key=${tmdbKey}`, {
            method: 'GET',
            headers: {
                authorization: accessToken,
                'content-type': 'application/json'
            },
        } )
        const result = response.json()
        console.log( result, "result functions" )
        return {
            statusCode: 200,
            body: JSON.stringify( { movies: result.results } )
        }
    } catch ( error ) {
        console.log( error, "error" )
        return {
            statusCode: 422, body: String( error )
        }
    }
}