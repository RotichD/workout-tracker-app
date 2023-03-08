import React, { useState, useContext } from "react";
import { Modal, TextInput, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Context as ExerciseContext } from "../context/ExerciseContext";

const ExerciseModalForm = () => {
  const [muscleGroup, setMuscleGroup] = useState("");
  const [name, setName] = useState("");
  const [isBodyWeight, setIsBodyWeight] = useState(false);

  const {
    state: { modalVisible },
    handleSubmit,
    onRequestClose,
    toggleModal,
  } = useContext(ExerciseContext);

  const toggleCheckbox = () => {
    setIsBodyWeight(!isBodyWeight);
  };

  const onCancel = () => {
    toggleModal();
    setIsBodyWeight(false);
    setName("");
    setMuscleGroup("");
  };

  const onSubmit = () => {
    try {
      handleSubmit(name, muscleGroup, isBodyWeight);
    } catch (err) {
      console.log(err);
    } finally {
      setIsBodyWeight(false);
      setName("");
      setMuscleGroup("");
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onRequestClose}
    >
      <View className="flex-1 items-center justify-center bg-gray-800/70">
        <View className=" bg-white p-8 rounded-lg w-80">
          <Text className="font-semibold mb-1">Exercise Name</Text>
          <TextInput
            className="border-2 border-gray-400 rounded-md p-2 mb-2"
            value={name}
            onChangeText={setName}
            placeholder="Bench Press"
          />
          <Text className="font-semibold mb-1">Muscle Group</Text>
          <TextInput
            className="border-2 border-gray-400 rounded-md p-2"
            value={muscleGroup}
            onChangeText={setMuscleGroup}
            placeholder="Push"
          />
          <View className="flex flex-row justify-between py-2 mt-2 items-center">
            <Text className="font-semibold">Body Weight Exercise?</Text>
            <TouchableOpacity
              onPress={toggleCheckbox}
              className="flex-row items-center"
            >
              {isBodyWeight ? (
                <MaterialIcons name="check-box" size={24} color="#9ca3af" />
              ) : (
                <MaterialIcons
                  name="check-box-outline-blank"
                  size={24}
                  color="#9ca3af"
                />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={onCancel}>
            <Text className="border-2 border-black w-20 text-center p-2 rounded-md self-center my-2">
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSubmit}>
            <Text className="bg-amber-400 w-20 text-center p-2 rounded-md self-center">
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ExerciseModalForm;
