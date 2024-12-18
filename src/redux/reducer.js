import { createAction, createReducer } from "@reduxjs/toolkit"; 
import axios from "axios"; 
const GET_CATEGORIES = 'GET_CATEGORIES'; 
const ADD_CART = 'ADD_CART'; 
const DECREMENT_CART = 'DECREMENT_CART'; 
const DELETE_CART = 'DELETE_CART'; 
const LOAD_CART = 'LOAD_CART';  
export const getCategories = () => { 
  let action = createAction(GET_CATEGORIES); 
  return (dispatch) => { 
    return axios('https://fakestoreapi.com/products/categories') 
      .then(({ data }) => dispatch(action(data))); 
  }; 
}; 
export const addCart = createAction(ADD_CART); 
export const decrementCart = createAction(DECREMENT_CART); 
export const deleteCart = createAction(DELETE_CART); 
export const loadCart = createAction(LOAD_CART);  
const initialState = { 
  categories: [], 
  cart: JSON.parse(localStorage.getItem('cart')) || [],  
}; 
const saveCartToLocalStorage = (cart) => { 
  localStorage.setItem('cart', JSON.stringify(cart)); 
}; 
export default createReducer(initialState, (builder) => { 
  builder 
    .addCase(GET_CATEGORIES, (state, action) => { 
      state.categories = action.payload; 
    }) 
    .addCase(ADD_CART, (state, action) => { 
      const idx = state.cart.findIndex(item => item.id === action.payload.id); 
      if (idx < 0) { 
        state.cart = [ 
          { 
            ...action.payload, 
            count: 1, 
          }, 
          ...state.cart 
        ]; 
      } else { 
        state.cart[idx].count++; 
      } 
      saveCartToLocalStorage(state.cart);  
    }) 
    .addCase(DECREMENT_CART, (state, action) => { 
      const idx = state.cart.findIndex(item => item.id === action.payload.id); 
      state.cart[idx].count--; 
      saveCartToLocalStorage(state.cart);  
    }) 
    .addCase(DELETE_CART, (state, action) => { 
      state.cart = state.cart.filter(item => item.id !== action.payload.id); 
      saveCartToLocalStorage(state.cart);  
    }) 
    .addCase(LOAD_CART, (state) => { 
      state.cart = JSON.parse(localStorage.getItem('cart')) || [];  
    }); 
}); 