import { View, Text } from "react-native";
import React from "react";

const WorkoutAttemptScreen = ({ route }) => {
  const exerciseDetails = route.params.exerciseObj;
  return (
    <View>
      <Text>WorkoutAttemptScreen</Text>
      <Text>{exerciseDetails.name}</Text>
      <Text>{exerciseDetails.id}</Text>
    </View>
  );
};

export default WorkoutAttemptScreen;
