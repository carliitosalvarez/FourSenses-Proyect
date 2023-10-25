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
};

const userReducer = (state, action) => {
  switch (action.type) {
    case actions.FETCH_DATA:
      return { ...state, loading: true };
    case actions.ADD_DATA:
      return { ...state, data: action.payload, loading: false }; // Corregir "playload" a "payload"
    case actions.REMOVE_DATA:
      const updatedData = state.data.filter((item) => item.id !== action.payload); // Corregir "playload" a "payload"
      return { ...state, data: updatedData };
    default:
      return state;
  }
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState); // Corregir "reducer" a "userReducer"

  useEffect(() => {
    dispatch({ type: actions.FETCH_DATA });
    axios
      .get("url")
      .then((response) => {
        dispatch({ type: actions.ADD_DATA, payload: response.data }); // Corregir "playload" a "payload"
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