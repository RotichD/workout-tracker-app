import createDataContext from "./createDataContext";
import {
  auth,
  collection,
  doc,
  db,
  setDoc,
  addDoc,
  onSnapshot,
} from "../../firebase";
import Toast from "react-native-toast-message";

const exerciseReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
    case "fetch_exercises":
      return { ...state, exercises: action.payload };
    case "submit":
      return {
        ...state,
        modalVisible: false,
      };
    case "start_loading":
      return { ...state, isLoading: true };
    case "stop_loading":
      return { ...state, isLoading: false };
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

const fetchExercises = (dispatch) => async () => {
  try {
    dispatch({ type: "start_loading" });
    onSnapshot(
      collection(db, "users", auth.currentUser.uid, "exercises"),
      async (querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ id: doc.id, ...doc.data() });
        });
        dispatch({ type: "stop_loading" });
        dispatch({ type: "fetch_exercises", payload: docs });
      }
    );
  } catch (err) {
    console.log(err);
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Having trouble loading your exercises :(",
      position: "bottom",
    });
  }
};

const handleSubmit = (dispatch) => async (name, muscleGroup, isBodyWeight) => {
  try {
    const userID = auth.currentUser.uid;
    const userRef = doc(db, "users", userID);
    const exerciseRef = collection(userRef, "exercises");
    await addDoc(exerciseRef, {
      name,
      muscleGroup,
      isBodyWeight,
    });
  } catch (err) {
    console.log(err);
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Something went wrong :(",
      position: "bottom",
    });
  } finally {
    dispatch({
      type: "submit",
    });
    Toast.show({
      type: "success",
      text1: "Success",
      text2: `Saved ${name} to your exercises`,
      position: "bottom",
    });
  }
};

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
    fetchExercises,
  },
  { modalVisible: false, errorMessage: "", exercises: [], isLoading: false }
);
