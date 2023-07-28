import { ADD_FAV, REMOVE_FAV, FILTER, ORDER, LOG_USER, ADD_CHAR, REMOVE_CHAR, GET_ALL_FAV } from "./types";
import axios from "axios";

export const getAllFavorites = (id) => {
    const endpoint = "http://localhost:3001/rickandmorty/fav/getall"
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

export const addFav = (char) => {
    const endpoint = "http://localhost:3001/rickandmorty/fav"

    return function(dispatch){
        axios
            .post(endpoint, char)
            .then(response => response.data)
            .then(data => {
                return dispatch({
                    type: ADD_FAV,
                    payload: data
                })
            }).catch()
    }
};

export const removeFav = (id) => {
    const endpoint = "http://localhost:3001/rickandmorty/fav/" + id;

    return function(dispatch){
        axios
            .delete(endpoint)
            .then(response => response.data)
            .then(data => {
                return dispatch({
                    type: REMOVE_FAV,
                    payload: data
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
    const endpoint = "http://localhost:3001/rickandmorty/character/" + id

    return function(dispatch){
        axios
            .get(endpoint)
            .then(response => response.data)
            .then(data => {
                console.log(data)
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