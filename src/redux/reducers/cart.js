// cartReducer.js
const initialState = {
    items: [],
    total: 0,
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        const existingItem = state.items.find(item => item.id === action.payload.id);
  
        if (existingItem) {
          return {
            ...state,
            items: state.items.map(item =>
              item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
            total: state.total + action.payload.price,
          };
        } else {
          return {
            ...state,
            items: [...state.items, { ...action.payload, quantity: 1 }],
            total: state.total + action.payload.price,
          };
        }
  
      case 'REMOVE_FROM_CART':
        const updatedItems = state.items.filter(item => item.id !== action.payload.id);
        return {
          ...state,
          items: updatedItems,
          total: state.total - action.payload.price * action.payload.quantity,
        };
  
      case 'UPDATE_QUANTITY':
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
          ),
        };
  
      case 'CLEAR_CART':
        return {
          ...state,
          items: [],
          total: 0,
        };
  
      default:
        return state;
    }
  };
  
  export default cartReducer;
  