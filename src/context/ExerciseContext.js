import createDataContext from "./createDataContext";

const exerciseReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
    case "submit":
      return {
        ...state,
        // name: "",
        // muscleGroup: "",
        // bodyWeight: false,
        modalVisible: false,
      };
    case 'add_error':
      return {...state, errorMessage: 'something went wrong'}
    case 'clear_error_message':
      return {...state, errorMEssage: ''}
    case "toggle_modal":
      return {
        ...state,
        modalVisible: !state.modalVisible,
      };
    case "on_request_close":
      return {
        ...state,
        modalVisible: false,
      };
  }
};

const handleSubmit = (dispatch) => (name, muscleGroup, isBodyWeight) => {
  console.log({
    name,
    muscleGroup,
    isBodyWeight,
  });
  dispatch({
    type: "submit",
  });
};

// const handleTextChange = (dispatch) => (name, muscleGroup) => {
//   dispatch({
//     type: "text_change",
//     payload: { name, muscleGroup },
//   });
// };

// const toggleCheckbox = (dispatch) => () => {
//   dispatch({
//     type: "toggle_checkbox",
//   });
// };

const onRequestClose = (dispatch) => () => {
  dispatch({
    type: "on_request_close",
  });
};

const toggleModal = (dispatch) => () => {
  dispatch({
    type: "toggle_modal",
  });
};

export const { Provider, Context } = createDataContext(
  exerciseReducer,
  {
    handleSubmit,
    onRequestClose,
    toggleModal,
  },
  { modalVisible: false, errorMessage: '' }
);
