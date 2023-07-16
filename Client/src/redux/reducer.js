import { ADD_FAV, REMOVE_FAV, FILTER, ORDER } from "./types";

const initialState = {
    filtered: [],
    myFavorites: []
}

export const reducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_FAV:
            return {
                ...state,
                myFavorites: action.payload
            }

        case REMOVE_FAV:
            return {
                ...state,
                myFavorites: action.payload,
                filtered: action.payload
            }

        case FILTER:
            return {
                ...state,
                filtered: [...state.myFavorites.filter(char => char.gender == action.payload)]
            }

        case ORDER:
            return action.payload === "A" ? {             /* Ascendente */
                ...state,
                filtered: [...state.myFavorites.sort((a, b) => a.id - b.id)]

            } : {                                       /* Descendiente */
                ...state,
                filtered: [...state.myFavorites.sort((a, b) => b.id - a.id)]

            }

        default:
            return { ...state }
    }
};