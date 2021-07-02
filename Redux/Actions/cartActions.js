import {ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, UPDATE_QTY} from '../constants';

export const addToCart = (payload) => {
    return {
        type: ADD_TO_CART,
        payload
    }
}

export const removeFromCart = (payload) => {
    return {
        type: REMOVE_FROM_CART,
        payload
    }
}

export const clearCart = () => {
    return {
        type: CLEAR_CART
    }
}

export const updateQty = (payload) => {
    return {
        type: UPDATE_QTY,
        payload
    }
}