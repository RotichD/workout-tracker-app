import createDataContext from "./createDataContext";
import { auth, collection, doc, db, setDoc, addDoc, onSnapshot } from "../../firebase";

const exerciseReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
    case "submit":
      return {
        ...state,
        modalVisible: false,
      };
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "clear_error_message":
      return { ...state, errorMEssage: "" };
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
    dispatch({
      type: "add_error",
      payload: "Something went wrong saving exercise.",
    });
  } finally {
    dispatch({
      type: "submit",
    });
  }
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
  { modalVisible: false, errorMessage: "" }
);
