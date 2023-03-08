import createDataContext from "./createDataContext";

const workoutReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
    case "on_request_close":
      return {
        ...state,
        modalVisible: false,
      };
    case "toggle_modal":
      return {
        ...state,
        modalVisible: !state.modalVisible,
      };
    case "clear_workout_list":
      return { ...state, workout: [] };
  }
};

const clearWorkout = (dispatch) => () => {
  dispatch({ type: "clear_workout_list" });
};

const loadWorkout = (dispatch) => () => {
  console.log("load workout");
};

const toggleModal = (dispatch) => () => {
  dispatch({ type: "toggle_modal" });
};

const onRequestClose = (dispatch) => () => {
  dispatch({ type: "on_request_close" });
};

export const { Provider, Context } = createDataContext(
  workoutReducer,
  { loadWorkout, onRequestClose, toggleModal, clearWorkout },
  {
    modalVisible: false,
    workout: [{ name: "1", id: "123f" }],
  }
);
