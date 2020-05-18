// exports.handler = async ( event, context ) => {
//     const subject = event.queryStringParameters.name || "World"
//     return {
//         statusCode: 200,
//         body: `Hello ${subject}`
//     }
// }


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