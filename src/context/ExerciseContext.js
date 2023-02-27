import createDataContext from "./createDataContext";

const exerciseReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
    case "submit":
      return {
        ...state,
        name: "",
        muscleGroup: "",
        bodyWeight: false,
        modalVisible: false,
      };
    case "text_change":
      return {
        ...state,
        name: action.payload.name,
        muscleGroup: action.payload.muscleGroup,
      };
    case "toggle_checkbox":
      return {
        ...state,
        bodyWeight: !bodyWeight,
      };
    case "toggle_modal":
      return {
        ...state,
        modalVisible: !modalVisible,
      };
  }
};

const handleSubmit = (dispatch) => (name, muscleGroup, bodyWeight) => {
  console.log({
    name,
    muscleGroup,
    bodyWeight,
  });
  dispatch({
    type: "submit",
  });
};

const handleTextChange = (dispatch) => (name, muscleGroup) => {
  dispatch({
    type: "text_change",
    payload: { name, muscleGroup },
  });
};

const toggleCheckbox = (dispatch) => () => {
  dispatch({
    type: "toggle_modal",
  });
};

export const { Provider, Context } = createDataContext(
  exerciseReducer,
  { handleSubmit, handleTextChange, toggleCheckbox },
  { name: "", muscleGroup: "", bodyWeight: false, modalVisible: false }
);
