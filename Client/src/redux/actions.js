import { ADD_FAV, REMOVE_FAV, FILTER, ORDER } from "./types";
import axios from "axios";

export const addFav = (char) => {
    const endpoint = "http://localhost:3001/rickandmorty/fav"

    return function(dispatch){
        axios
            .post(endpoint, char)
            .then(response => response.data)
            .then(data => {
                console.log(data)
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