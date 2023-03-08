import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Context as WorkoutContext } from "../context/WorkoutContext";

const AddExerciseListeItem = ({ data }) => {
  const {
    state: { workout },
  } = useContext(WorkoutContext);

  console.log(data)

  const presentInBoth = workout.some((workout) => workout.id === data.id);

  return (
    <TouchableOpacity>
      <View className="flex-1 border-b-2 border-amber-500 bg-white p-2 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <View>
            {data.isBodyWeight ? (
              <MaterialCommunityIcons
                name="human-handsup"
                size={24}
                color="black"
              />
            ) : (
              <Ionicons name="ios-barbell" size={24} color="black" />
            )}
          </View>
          <View className="ml-2">
            <Text className="font-semibold text-slate-900 truncate">
              {data.name}
            </Text>
            <Text className="text-slate-600">{data.muscleGroup}</Text>
          </View>
        </View>
        <View>
          {presentInBoth ? (
            <Ionicons name="radio-button-on" size={24} color="black" />
          ) : (
            <Ionicons name="radio-button-off" size={24} color="black" />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AddExerciseListeItem;
