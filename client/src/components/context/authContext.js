import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext("");

export const AuthContextProvider = ({ children }) => {
  const authReducer = (state, action) => {
      if (action.type == "LOGIN") {
        console.log(action.payload)
      sessionStorage.setItem("user", JSON.stringify(action.payload));

      return {
        user: action.payload,
      };
    } else if (action.type == "LOGOUT") {
      sessionStorage.removeItem("user");
      return {
        user: null,
      };
    }

    return state;
  };

  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  console.log(state);
  //   useEffect(() => {
  //     if (user) {
  //       dispatch({ type: "LOGIN", payload: JSON.parse(user) });
  //     }
  //   }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
