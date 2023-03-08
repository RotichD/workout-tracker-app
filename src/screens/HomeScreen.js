import React, { useContext, useEffect } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../firebase";
import HomeMenu from "../components/HomeMenu";
import { Context as WorkoutContext } from "../context/WorkoutContext";
import { Context as ExerciseContext } from "../context/ExerciseContext";
import ExerciseListModal from "../components/ExerciseListModal";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  const {
    toggleModal,
    clearWorkout,
    state: { workout },
  } = useContext(WorkoutContext);

  const {
    fetchExercises,
    // state: { exerises },
  } = useContext(ExerciseContext);

  useEffect(() => {
    const unsubscribe = () => {
      try {
        fetchExercises();
      } catch (err) {
        console.log(err);
      }
    };

    unsubscribe();

    return unsubscribe;
  }, []);

  const loadIcon = <Ionicons name="reload" size={18} color="white" />;
  const plusIcon = <Ionicons name="add" size={24} color="white" />;
  const saveIcon = <Ionicons name="ios-save" size={18} color="black" />;
  const clearIcon = (
    <Ionicons name="remove-circle-outline" size={18} color="black" />
  );

  const topMenu = () => (
    <HomeMenu
      leftIcon={loadIcon}
      rightIcon={plusIcon}
      rightBtnPress={toggleModal}
      leftBtnText=" Load Workout"
      rightBtnText="Exercises"
      color="bg-gray-500"
      text="white"
      styles="mb-2"
    />
  );

  const bottomMenu = () => (
    <HomeMenu
      leftIcon={clearIcon}
      leftBtnText="Clear List"
      leftBtnPress={clearWorkout}
      rightIcon={saveIcon}
      rightBtnText="Save Workout"
      color="bg-amber-500"
      text="black"
      styles="mt-2"
    />
  );

  const title = () => (
    <>
      <View className="mt-5 flex-row justify-center">
        <Text className="text-3xl text-center font-bold text-amber-500">
          Evo
        </Text>
        <Text className="text-3xl font-bold text-gray-900">Tracker</Text>
      </View>
      <Text className="text-center font-bold text-gray-500 shadow-amber-400">
        Evolution Starts Here
      </Text>
    </>
  );

  return (
    <SafeAreaView className="flex-1 pt-0">
      {title()}
      <ScrollView className="p-5">
        <View className=" h-fit justify-between">
          {topMenu()}
          {workout.length > 1 && bottomMenu()}
        </View>
      </ScrollView>

      <ExerciseListModal />
    </SafeAreaView>
  );
};

export default HomeScreen;
