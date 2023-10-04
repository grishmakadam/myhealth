import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  addToCartApi,
  getAllItemsApi,
  purchaseHistoryApi,
} from "../../apicalls/apicalls";

const CartContext = createContext();

// const cartReducer = (state, action) => {
//   switch (action.type) {
//     case "ADD_TO_CART":
//       console.log(action.payload)
//       const existingItemIndex = state.items.findIndex(
//         (item) => item.planId === action.payload.planId
//       );
//       if (existingItemIndex !== -1) {
//         const updatedItems = [...state.items];

//         updatedItems[existingItemIndex].quantity += 1;

//         return { ...state, items: updatedItems, count: state.count + 1 };
//       } else {
//         return {
//           ...state,
//           items: [...state.items, { ...action.payload, quantity: 1 }],
//           count: state.count + 1,
//         };
//       }

//     case "REMOVE_FROM_CART":
//       // Remove the item from the cart
//       const existingItem = state.items.findIndex(
//         (item) => item.id === action.payload.id
//       );
//       const updatedItems = [...state.items];

//       if (updatedItems[existingItem].quantity > 1) {
//         updatedItems[existingItem].quantity -= 1;
//       } else {
//         updatedItems.splice(existingItem, 1);
//       }

//       return { ...state, items: updatedItems, count: state.count - 1 };

//     case "REMOVE_ITEM":
//       const index = state.items.findIndex(
//         (item) => item.id === action.payload.id
//       );
//       const temp = [...state.items];
//       let quant;
//       if (index != -1) {
//         quant = state.count - temp[index].quantity;
//         temp.splice(index, 1);
//       }
//       return { ...state, items: temp, count: quant };

//     case "INITIALISE_CART":
//       localStorage.setItem("cart", JSON.stringify(action.payload));

//       return { ...state, items: [...action.payload] };
//     case "CLEAR_CART":
//       localStorage.setItem("cart", JSON.stringify([]));

//       return { ...state, items: [] };
//     default:
//       return state;
//   }
// };

// CartProvider component
const CartProvider = ({ children }) => {
  // const [cart, dispatch] = useReducer(cartReducer, initialState);

  const [cart, setCart] = useState({ items: [], quantity: 0, total: 0 });

  const [orders, setOrders] = useState([]);
  const getAllItems = async () => {
    const res = await getAllItemsApi();
    if (res.success) {
      const quantity = res.items.reduce(
        (sum, current) => sum + current.quantity,
        0
      );
      const total = res.items.reduce(
        (sum, current) => sum + current.quantity * current.price,
        0
      );
      setCart((prev) => ({
        ...prev,
        items: [...res.items],
        quantity: quantity,
        total: total,
      }));
    }
  };
  const getAllOrders = async () => {
    const res = await purchaseHistoryApi();
    if (res.success) {
      setOrders(res.items);
    }
  };
  // useEffect(() => {
  //   getAllItems();
  //   getAllOrders();
  // }, []);

  return (
    <CartContext.Provider value={{ cart, getAllItems, orders, getAllOrders }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
