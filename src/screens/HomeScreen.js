import React, { useContext, useEffect } from "react";
import { Text, View, FlatList, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../firebase";
import HomeMenu from "../components/HomeMenu";
import { Context as WorkoutContext } from "../context/WorkoutContext";
import { Context as ExerciseContext } from "../context/ExerciseContext";
import ExerciseListModal from "../components/ExerciseListModal";
import { Ionicons } from "@expo/vector-icons";
import WorkoutCard from "../components/WorkoutCard";

const HomeScreen = () => {
  const {
    toggleModal,
    clearWorkouts,
    state: { workouts },
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

  const loadIcon = <Ionicons name="reload" size={14} color="black" />;
  const plusIcon = <Ionicons name="add" size={18} color="black" />;
  const startIcon = (
    <Ionicons name="ios-play-circle-sharp" size={18} color="black" />
  );
  const clearIcon = (
    <Ionicons name="remove-circle-outline" size={18} color="black" />
  );

  const commingSoonAlert = () => {
    Alert.alert(
      "Feature Coming Soon",
      "This feature is not yet available. Please check back later.",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }]
    );
  };

  const tutorialAlert = () => {};

  const topMenu = () => (
    <HomeMenu
      leftIcon={loadIcon}
      rightIcon={plusIcon}
      leftBtnPress={commingSoonAlert}
      rightBtnPress={toggleModal}
      leftBtnText=" Load Workout"
      rightBtnText="Exercises"
      color="bg-gray-300"
      text="black"
      styles="mb-1"
    />
  );

  const bottomMenu = () => (
    <TouchableOpacity
      onPress={clearWorkouts}
      className={`h-13 w-36 mb-2 flex-row items-center justify-center p-3 mr-1 rounded-xl bg-gray-300`}
    >
      {clearIcon}
      <Text>Clear List</Text>
    </TouchableOpacity>
  );

  const title = () => (
    <>
      <View className="mt-5 flex-row justify-center">
        <Text className="text-3xl text-center font-bold text-amber-500 shadow">
          Evo
        </Text>
        <Text className="text-3xl font-bold shadow">Tracker</Text>
      </View>
      <Text className="text-center font-bold text-gray-500 shadow">
        Evolution Starts Here
      </Text>
    </>
  );

  const helperText = () => (
    <Text className="text-center text-slate-600 mb-64 p-8">
      Add an exercise to get started. Press on an exercise card to enter workout
      attempt details and save progress.
    </Text>
  );

  return (
    <SafeAreaView className="flex-1 pt-0">
      {title()}
      <View className="flex-1 pt-4 justify-between">
        <View className="justify-between">
          {topMenu()}
          {workouts.length > 0 && (
            <FlatList
              className="h-96"
              data={workouts}
              renderItem={({ item }) => <WorkoutCard data={item} />}
              keyExtractor={(item) => item.id}
            />
          )}
        </View>
        <View className="flex items-center">
          {workouts.length > 0 && bottomMenu()}
          {/* {workouts.length > 0 && (
            <TouchableOpacity className="border-b border-white flex-row justify-center items-center self-center my-2" onPress={commingSoonAlert}>
              <Ionicons name="ios-download-outline" size={14} color="white" />
              <Text className="text-white font-semibold">Save Workout</Text>
            </TouchableOpacity>
          )} */}
          {workouts.length === 0 && helperText()}
        </View>
      </View>

      <ExerciseListModal />
    </SafeAreaView>
  );
};

export default HomeScreen;
