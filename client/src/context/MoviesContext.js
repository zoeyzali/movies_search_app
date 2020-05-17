import React, { createContext, useState, useEffect } from 'react'

export const MoviesContext = createContext()

const localState = JSON.parse( localStorage.getItem( 'favorited' ) )

export const MoviesContextProvider = ( props ) => {
    const [favorited, setFavorited] = useState( localState || [] )
    // const [isFavorited, setIsFavorited] = useState( false )


    const addToFavorites = ( item ) => {
        let newList = [...favorited]
        let index = newList.findIndex( movie => movie.id === item.id )
        if ( index !== -1 ) {
            const updatedItem = { ...newList[index] }
            newList[index] = updatedItem
            alert( "Item already favorited" )
        } else {
            setFavorited( [...favorited, item] )
            alert( "item added!" )
        }
        // setIsFavorited( !isFavorited )
    }

    const removeFavorite = ( id ) => {
        let newList = [...favorited]
        const filtered = newList.filter( movie => movie.id !== id )
        setFavorited( [...filtered] )
    }


    useEffect( () => {
        localStorage.setItem( 'favorited', JSON.stringify( favorited ) )
    }, [favorited] )


    return (
        <MoviesContext.Provider value={{
            favorited,
            setFavorited,
            addToFavorites,
            removeFavorite,
            // isFavorited,
            // setIsFavorited
        }}>
            {props.children}
        </MoviesContext.Provider>
    )
}
