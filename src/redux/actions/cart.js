// cartActions.js
export const addToCart = (game) => {
  return {
    type: 'ADD_TO_CART',
    payload: {
      id: String(game.id),
      game: game, // Store the entire game object
      quantity: 1,
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


  export const increaseQuantity = (id, maxQuantity) => {
    return {
      type: 'INCREASE_QUANTITY',
      payload: {
        id: String(id),
        maxQuantity,
      },
    };
  };
  

export const decreaseQuantity = (id) => {
  return {
    type: 'DECREASE_QUANTITY',
    payload: {
      id: String(id),
    },
  };
};
