import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";
import Cookies from 'js-cookie';

const INITIAL_STATE = {
  user:JSON.parse(sessionStorage.getItem("user"))  || null,
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(state.user));
    // var readcookie = Cookies.get('jwt') ;
    // if(!readcookie && state.user) {
    //   Cookies.set("jwt", JSON.stringify(state.user.jwt), { expires: 7 });
    // }
  }, [state.user]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};