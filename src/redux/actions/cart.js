// cartActions.js
export const addToCart = (id) => {
  return {
    type: 'ADD_TO_CART',
    payload: {
      id: String(id),
    },
  };
};
  
export const removeFromCart = (id) => {
  return {
    type: 'REMOVE_FROM_CART',
    payload: {
      id: String(id),
    },
  };
};
  
  export const updateQuantity = (product, quantity) => {
    return {
      type: 'UPDATE_QUANTITY',
      payload: { id: product.id, quantity },
    };
  };
  
  export const clearCart = () => {
    return {
      type: 'CLEAR_CART',
    };
  };
  