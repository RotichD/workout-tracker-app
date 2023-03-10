import createDataContext from "./createDataContext";
import {
  auth,
  collection,
  doc,
  db,
  arrayUnion,
  updateDoc,
  addDoc,
  getDoc
} from "../../firebase";
import Toast from 'react-native-toast-message';

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
    case "save_attempt":
      return { ...state, workouts:  state.workouts.filter((workout) => workout.id !== action.payload)};
  }
};

const saveAttempt =
  (dispatch) =>
  async (
    id,
    sets,
    reps,
    weight,
    totalReps,
    repsGoal,
    performance,
    volume,
    isBodyWeight,
  ) => {
    const attempts = [];
    const attemptObj = {
      sets: sets,
      reps: reps,
      totalReps: totalReps,
      repsGoal: repsGoal,
      performance: performance,
    };

    if (isBodyWeight) {
      attemptObj.weight = 0;
      attemptObj.volume = totalReps;
    } else {
      attemptObj.weight = weight;
      attemptObj.volume = volume;
    }
    console.log("id ", id);
    console.log(attemptObj);
    attempts.push(attemptObj);

    const uid = auth.currentUser.uid;
    const exerciseDocRef = doc(db, "users", uid, "exercises", id);

    try {

        const exerciseDocSnap = await getDoc(exerciseDocRef);
        if (exerciseDocSnap.exists()) {
          const attemptsCollectionRef = collection(exerciseDocRef, 'attempts')
          await addDoc(attemptsCollectionRef, {
            ...attemptObj,
            timestamp: new Date().toISOString(),
          })
          console.log("Document successfully updated!");
          Toast.show({
                type: "success",
                text1: "Success",
                text2: `Saved Attempt`,
                position: "bottom",
              });
              dispatch({ type: "save_attempt", payload: id });
        } else {
          console.log('does not exist')
        }
    } catch (err) {
      console.log(err);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Having trouble saving attempt :(",
        position: "bottom",
      });
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
  {
    loadWorkout,
    onRequestClose,
    toggleModal,
    clearWorkouts,
    removeWorkout,
    saveAttempt,
  },
  {
    modalVisible: false,
    workouts: [],
  }
);
