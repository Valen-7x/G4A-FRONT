const initialState = {
  items: [],
  total: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.items.find((item) => item.id === action.payload.id);

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) => (item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item)),
          total: state.total + action.payload.game.price, // Update the price calculation
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload }],
          total: state.total + action.payload.game.price, // Update the price calculation
        };
      }

    case "REMOVE_FROM_CART":
      console.log("Reducer: Removing item with ID:", action.payload.id);
      const removedItem = state.items.find((item) => item.id === action.payload.id);
      const updatedItems = state.items.filter((item) => item.id !== action.payload.id);
      return {
        ...state,
        items: updatedItems,
        total: state.total - removedItem.game.game.price * removedItem.quantity,
      };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) => (item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item)),
      };

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
        total: 0,
      };

    case "INCREASE_QUANTITY":
      const itemToIncrease = state.items.find((item) => item.id === action.payload.id);
      const availableKeys = itemToIncrease.game.game.keys.length;

      console.log("<<< item idk >>>", itemToIncrease);
      console.log("itemToIncrease.quantity:", itemToIncrease.quantity);
      console.log("availableKeys:", availableKeys);

      if (itemToIncrease.quantity < availableKeys) {
        return {
          ...state,
          items: state.items.map((item) => (item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item)),
          total: state.total + state.items.find((item) => item.id === action.payload.id).price,
        };
      }
      return state; // No change if max quantity is reached

    case "DECREASE_QUANTITY":
      const itemToDecrease = state.items.find((item) => item.id === action.payload.id);

      if (itemToDecrease.quantity === 1) {
        // If the quantity is already 1, remove the item from the cart
        const updatedItems = state.items.filter((item) => item.id !== action.payload.id);
        return {
          ...state,
          items: updatedItems,
          total: state.total - itemToDecrease.price,
        };
      } else {
        return {
          ...state,
          items: state.items.map((item) => (item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item)),
          total: state.total - itemToDecrease.price,
        };
      }

    default:
      return state;
  }
};

export default cartReducer;
