const fetch = require( 'node-fetch' )
// import fetch from 'node-fetch'
const tmdbKey = process.env.REACT_APP_TMDB_KEY
// const baseURL = process.env.REACT_APP_BASE_URL
const accessToken = process.env.REACT_APP_ACCESS_TOKEN

exports.handler = async ( event, context ) => {
  return fetch( `https://api.themoviedb.org/4/list/140481?language=en-US&page=1&include_adult=false&api_key=${tmdbKey}`,
    {
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