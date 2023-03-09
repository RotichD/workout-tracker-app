import React, { useContext, useEffect } from "react";
import { Text, TouchableOpacity, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";

import ExerciseModalForm from "../components/ExerciseModal";
import ExerciseCard from "../components/ExerciseCard";
import SkeletonCards from "../components/SkeletonCards";

import { Context as ExerciseContext } from "../context/ExerciseContext";

const ExercisesScreen = () => {

  const {
    toggleModal,
    state: { exercises, isLoading },
  } = useContext(ExerciseContext);


  const title = () => (
    <Text className="text-3xl text-center font-bold text-gray-900 my-5 shadow-amber-400">
      My Exercises
    </Text>
  );

  const addExerciseButton = () => (
    <TouchableOpacity
      className="bg-amber-400 shadow-md my-2 mx-8 rounded-lg p-5 flex flex-row items-center justify-between"
      onPress={toggleModal}
    >
      <Text className="font-semibold text-slate-600">Add Exercise</Text>
      <Entypo name="add-to-list" size={24} color="black" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {title()}
      {addExerciseButton()}
      {isLoading ? <SkeletonCards /> : null}
      <FlatList
        data={exercises}
        renderItem={({ item }) => <ExerciseCard data={item} />}
        keyExtractor={(item) => item.id}
        className="flex-1 px-8"
      />
      <ExerciseModalForm />
    </SafeAreaView>
  );
};

export default ExercisesScreen;
