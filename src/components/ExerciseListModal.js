import React, { useContext } from "react";
import { View, Text, Modal, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Context as WorkoutContext } from "../context/WorkoutContext";
import { Context as ExerciseContext } from "../context/ExerciseContext";
import AddExerciseListeItem from "./AddExerciseListeItem";

const ExerciseListModal = ({ listData }) => {
    const {
      state: { exercises },
    } = useContext(ExerciseContext);
  const {
    state: { modalVisible },
    onRequestClose,
    toggleModal,
  } = useContext(WorkoutContext);

  console.log(exercises)

  return (
    <Modal
      animationType="fade"
      visible={modalVisible}
      onRequestClose={onRequestClose}
      transparent={false}
    >
      <View className="flex-1 items-center justify-center bg-gray-800/70">
        <View className="w-screen p-8 justify-center">
          <FlatList
            data={exercises}
            renderItem={({ item }) => <AddExerciseListeItem data={item} />}
            keyExtractor={(item) => item.id}
          />
          <TouchableOpacity
            onPress={onRequestClose}
            className="p-2 bg-amber-500 rounded-b-lg"
          >
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ExerciseListModal;
