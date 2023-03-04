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
    case "submit":
      return {
        ...state,
        modalVisible: false,
      };
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
  },
  { modalVisible: false, errorMessage: "" }
);
