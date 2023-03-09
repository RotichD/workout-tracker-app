import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Context as WorkoutContext } from "../context/WorkoutContext";
import { Touchable } from "react-native-web";

const AddExerciseListeItem = ({ data }) => {
  const {
    state: { workouts },
    loadWorkout,
    removeWorkout,
  } = useContext(WorkoutContext);

  const isLoadedInState = workouts.some((workout) => workout.id === data.id);

  const handlePress = () => {
    if (isLoadedInState) {
      removeWorkout(data);
    } else {
      loadWorkout(data);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.listItem}>
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
          {isLoadedInState ? (
            <Ionicons name="radio-button-on" size={24} color="black" />
          ) : (
            <Ionicons name="radio-button-off" size={24} color="black" />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    borderBottomWidth: "2px",
    borderBottomColor: "#f59e0b",
    backgroundColor: "#FFFFFF",
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default AddExerciseListeItem;
