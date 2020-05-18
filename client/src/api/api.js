const fetchAll = () => {
    return fetch( '../../functions/movies' )
        .then( ( response ) => {
            console.log( response, "respons fetchAll" )
            return response.json()
        } )
}