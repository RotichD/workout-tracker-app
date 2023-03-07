import React, { useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Context as ExerciseContext } from "../context/ExerciseContext";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const ExerciseDetailScreen = ({ route }) => {
  const _id = route.params._id;

  const {
    state: { exercises },
  } = useContext(ExerciseContext);
  const exercise = exercises.find((e) => e.id === _id);

  const title = () => (
    <View className="mb-5">
      <View className="flex-row justify-center items-center">
        <Text className="text-xl font-bold text-gray-900 mx-2">
          {exercise.name}
        </Text>
        <MaterialIcons name="edit" size={24} color="black" />
      </View>

      <Text className="font-semibold text-slate-600 text-center">
        {exercise.muscleGroup}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 px-8">
      {title()}
      <Text className="font-bold text-lg text-left">History</Text>
      <ScrollView>
        <View className="bg-amber-400 shadow-md my-2 rounded-lg p-5 justify-between">
          <View className="flex-row justify-between">
            <Text className=" font-semibold">Attempted on:</Text>
            <Text className="text-slate-800">02/23/2023</Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="font-semibold">Goal: 4 sets of 8 reps</Text>
            <View className="flex-row items-center">
              <Text className="font-semibold">65</Text>
              <MaterialCommunityIcons
                name="weight-pound"
                size={18}
                color='"black"'
              />
            </View>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="font-semibold">Completed: 30/32 Reps</Text>
            <Text className="font-semibold text-green-700">94%</Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="font-semibold">Total Volume: 1,950 lbs</Text>
            <Ionicons name="ios-trending-up" size={18} color="black" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExerciseDetailScreen;
