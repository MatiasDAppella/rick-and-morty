import { ADD_FAV, REMOVE_FAV, FILTER, ORDER, LOG_USER, ADD_CHAR, REMOVE_CHAR, GET_ALL_FAV } from "./types";
import axios from "axios";
const domain = "https://rick-and-morty-api-tikr.onrender.com";

export const getAllFavorites = (id) => {
    const endpoint = `${domain}/rickandmorty/fav/getall`
    const user = { UserId: id }
    console.log(user)
    
    return function(dispatch){
        axios
            .post(endpoint, user)
            .then(response => response.data)
            .then(data => {
                return dispatch({
                    type: GET_ALL_FAV,
                    payload: data
                })
            }).catch()
    }
};

export const addFav = (UserId, CharacterId) => {
    const endpoint = `${domain}/rickandmorty/fav`
    const user = { UserId, CharacterId }

    return function(dispatch){
        axios
            .post(endpoint, user)
            .then(response => response.data)
            .then(data => {
                return dispatch({
                    type: ADD_FAV,
                    payload: data
                })
            }).catch()
    }
};

export const removeFav = (UserId, CharacterId) => {
    const endpoint = `${domain}/rickandmorty/fav?user=${UserId}&char=${CharacterId}`
    console.log("ENDPOINT:", endpoint)

    return function(dispatch){
        axios
            .delete(endpoint)
            .then(response => response.data)
            .then(data => {
                console.log(data)
                return dispatch({
                    type: REMOVE_FAV,
                    payload: data.toString()
                })
            }).catch()
    }
};

export const filterCards = (gender) => ({
    type: FILTER,
    payload: gender
});

export const orderCards = (order) => ({
    type: ORDER,
    payload: order
});

// Log user
export const logUser = (id) => ({
    type: LOG_USER,
    payload: id
});

// Render characters
export const addCharacter = (id) => {
    id = id.toString()
    const endpoint = `${domain}/rickandmorty/character/${id}`

    return function(dispatch){
        axios
            .get(endpoint)
            .then(response => response.data)
            .then(data => {
                return dispatch({
                    type: ADD_CHAR,
                    payload: data
                })
            }).catch()
    }
};

export const removeCharacter = (id) => ({
    type: REMOVE_CHAR,
    payload: id
});
