import { ADD_FAV, REMOVE_FAV, FILTER, ORDER } from "./types";

export const addFav = (char) => ({
    type: ADD_FAV,
    payload: char
});

export const removeFav = (id) => ({
    type: REMOVE_FAV,
    payload: Number(id)
});

export const filterCards = (gender) => ({
    type: FILTER,
    payload: gender
});

export const orderCards = (order) => ({
    type: ORDER,
    payload: order
});