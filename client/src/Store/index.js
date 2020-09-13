import React, { useReducer } from "react";
import reducer from "./reducer.js";
import intialState from "./initialState.js";

const GlobalDataContext = React.createContext(null);
const GlobalDataConsumer = GlobalDataContext.Consumer;

const GlobalDataProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, intialState);
  //placing above wasn't triggering the consumers
  const value = {
    state,
    dispatch,
  };
  return (
    <GlobalDataContext.Provider value={value}>
      {props.children}
    </GlobalDataContext.Provider>
  );
};

export { GlobalDataContext, GlobalDataProvider, GlobalDataConsumer };
