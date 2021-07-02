import { CardItem } from 'native-base';
import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    UPDATE_QTY
} from '../constants';
const cartItems = (state = [], action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return [...state, action.payload]
        case REMOVE_FROM_CART:
            return state.filter(cartItem => cartItem !== action.payload)
        case CLEAR_CART:
            return state=[]
        case UPDATE_QTY:
            let cartItem = state.find(item => item.food.id === action.payload.food.id)
            if (action.payload.plusOrMinus == "+"){
                cartItem.quantity++
            }else {
                cartItem.quantity--
            }
            
            console.log(cartItem.food.id)
            console.log(cartItem.food.name)
            console.log(cartItem.food.price)
            console.log(cartItem.quantity)
            return [...state]
    }
    return state;
}

export default cartItems;