import * as actionTypes from '../actionTypes'
import axios from '../../axios-order'

export const addIngredient= (ingredient)=>{
    return { type: actionTypes.ADD_INGREDIENTS , item: ingredient}
}

export const reduceIngredient= (ingredient)=>{
    return { type: actionTypes.REMOVE_INGREDIENCE , item: ingredient}
}

export const loadIngredients= (data)=>{
    return {type: actionTypes.LOAD_DATA, ingredients:data}
}

export const loadIngredients_failed=(err)=>{
    return {type: actionTypes.LOAD_DATA_FAILED, error: err}
}

export const initIngredients=()=>{
    return dispatch =>{
        axios.get('/Ingredients.json')
        .then(response=>dispatch(loadIngredients(response.data)))
        .catch(error=> dispatch(loadIngredients_failed(error)))
    }
}

export const loadPrevIngredients= ()=>{
    return {type :actionTypes.SET_AUTH_REDIRECT}
}
