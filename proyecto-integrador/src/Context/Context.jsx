/* eslint-disable */
/* eslint-disable */
import React, { useReducer, useContext, createContext, useEffect } from "react";
import axios from "axios";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const actions = {
  FETCH_DATA: "FETCH_DATA",
  ADD_DATA: "ADD_DATA",
  REMOVE_DATA: "REMOVE_DATA",
  ERROR: "ERROR", 
};

const userReducer = (state, action) => {
  switch (action.type) {
    case actions.FETCH_DATA:
      return { ...state, loading: true };
    case actions.ADD_DATA:
      return { ...state, data: action.payload, loading: false };
    case actions.REMOVE_DATA:
      const updatedData = state.data.filter((item) => item.id !== action.payload); 
      return { ...state, data: updatedData };
    case actions.ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    dispatch({ type: actions.FETCH_DATA });
    axios
      .get("http://localhost:8080/comidas")
      .then((response) => {
        dispatch({ type: actions.ADD_DATA, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: actions.ERROR, payload: error });
      });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
export const useAppContext = () => useContext(AppContext);
