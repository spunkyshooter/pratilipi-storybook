import * as TYPES from "./actionTypes";
import intialState from "./initialState.js";
//Whatever dispatch sends, it comes to action.

function reducer(state, action) {
  const st = { ...state };
  const { payload } = action;
  switch (action.type) {
    case TYPES.UPDATE_USER:
      st.user = payload;
    break;
    default:
      console.log({ type: action.type });
      throw new Error();
  }
  return st;
}

export default reducer;
