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
      return { ...state, workouts: [] };

    case "load_workout":
      return { ...state, workouts: [...state.workouts, action.payload] };
    case "remove_workout":
      const updatedWorkouts = state.workouts.filter(
        (workout) => workout !== action.payload
      );
      return { ...state, workouts: updatedWorkouts };
  }
};

const clearWorkouts = (dispatch) => () => {
  dispatch({ type: "clear_workout_list" });
};

const loadWorkout = (dispatch) => (obj) => {
  dispatch({ type: "load_workout", payload: obj });
};

const removeWorkout = (dispatch) => (obj) => {
  dispatch({ type: "remove_workout", payload: obj });
};

const toggleModal = (dispatch) => () => {
  dispatch({ type: "toggle_modal" });
};

const onRequestClose = (dispatch) => () => {
  dispatch({ type: "on_request_close" });
};

export const { Provider, Context } = createDataContext(
  workoutReducer,
  { loadWorkout, onRequestClose, toggleModal, clearWorkouts, removeWorkout },
  {
    modalVisible: false,
    workouts: [],
  }
);
