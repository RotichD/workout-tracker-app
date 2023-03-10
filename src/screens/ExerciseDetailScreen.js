import React, { useContext, useEffect } from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Context as ExerciseContext } from "../context/ExerciseContext";
import { MaterialIcons } from "@expo/vector-icons";
import AttemptCard from "../components/AttemptCard";

const ExerciseDetailScreen = ({ route }) => {
  const _id = route.params._id;

  const {
    state: { exercises, attempts },
    fetchDetails,
  } = useContext(ExerciseContext);
  const exercise = exercises.find((e) => e.id === _id);
  const sortedAttempts = attempts.slice().sort((a, b) => {
    const dateA = new Date(a.timestamp).getTime();
    const dateB = new Date(b.timestamp).getTime();
    return dateB - dateA;
  });

 

  useEffect(() => {
    const unsubscribe = () => {
      try {
        fetchDetails(exercise.id);
      } catch (err) {
        console.log(err);
      }
    };

    unsubscribe();

    return unsubscribe;
  }, []);

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
      <FlatList
        data={sortedAttempts}
        renderItem={({ item, index }) => (
          <AttemptCard
            detailObj={item}
            isBodyWeight={exercise.isBodyWeight}
            previousAttempt={index < sortedAttempts.length - 1 ? sortedAttempts[index + 1] : null} 
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default ExerciseDetailScreen;
