import React, { useState } from "react";
import { Modal, TextInput, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const ExerciseModalForm = ({ toggleModal, isVisible, setIsVisible }) => {
  const [muscleGroup, setMuscleGroup] = useState("");
  const [name, setName] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = () => {
    console.log(`Submitted: ${name}`);
    setIsVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
    >
      <View className="flex-1 items-center justify-center bg-gray-800/70">
        <View className=" bg-white p-8 rounded-lg w-80">
          <Text>Exercise Name</Text>
          <TextInput
            className="border-2 border-gray-400 rounded-md p-2 mb-2"
            value={name}
            onChangeText={setName}
            placeholder="Bench Press"
          />
          <Text>Muscle Group</Text>
          <TextInput
            className="border-2 border-gray-400 rounded-md p-2"
            value={muscleGroup}
            onChangeText={setMuscleGroup}
            placeholder="Push"
          />
          <View className="flex flex-row justify-between py-2 mt-2 items-center">
            <Text>Body Weight Exercise?</Text>
            <TouchableOpacity
              onPress={toggleCheckbox}
              className="flex-row items-center"
            >
              {isChecked ? (
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

          <TouchableOpacity onPress={toggleModal}>
            <Text className="border-2 border-black w-20 text-center p-2 rounded-md self-center my-2">
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmit}>
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
