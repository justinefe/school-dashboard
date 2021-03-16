export const initialState = {
  basket: [],
  user: null,
  year: [],
  days: [],
  weeks: [],
  allYears: [],
  months: [],
};

// Selector
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_GENDER":
      return {
        ...state,
        gender: action.gender,
      };
    case "SET_STUDENT":
      return {
        ...state,
        student: action.student,
      };
    case "SET_PRINCIPAL":
      return {
        ...state,
        principal: action.principal,
      };
    case "SET_TEACHER":
      return {
        ...state,
        teacher: action.teacher,
      };
    default:
      return state;
  }
};

export default reducer;
