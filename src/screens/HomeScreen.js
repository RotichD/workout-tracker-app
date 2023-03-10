import React, { useContext, useEffect } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
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

  const topMenu = () => (
    <HomeMenu
      leftIcon={loadIcon}
      rightIcon={plusIcon}
      rightBtnPress={toggleModal}
      leftBtnText=" Load Workout"
      rightBtnText="Exercises"
      color="bg-gray-300"
      text="black"
      styles="mb-1"
    />
  );

  const bottomMenu = () => (
    <HomeMenu
      leftIcon={clearIcon}
      leftBtnText=" Clear List"
      leftBtnPress={clearWorkouts}
      rightIcon={startIcon}
      rightBtnText=" Start Workout"
      color="bg-amber-500"
      text="black"
      styles="mt-1"
    />
  );

  const title = () => (
    <>
      <View className="mt-5 flex-row justify-center">
        <Text className="text-3xl text-center font-bold text-amber-500 shadow">
          Evo
        </Text>
        <Text className="text-3xl font-bold text-gray-900 shadow">Tracker</Text>
      </View>
      <Text className="text-center font-bold text-gray-500 shadow">
        Evolution Starts Here
      </Text>
    </>
  );

  return (
    <SafeAreaView className="flex-1 pt-0">
      {title()}
      <View className="flex-1 pt-4 justify-between">
        <View className="justify-between">
          {topMenu()}
          <FlatList
          className='h-96'
            data={workouts}
            renderItem={({ item }) => <WorkoutCard data={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View className="flex">
          {workouts.length > 0 && bottomMenu()}
          {workouts.length > 0 && (
            <TouchableOpacity className="border-b border-amber-500 flex-row justify-center items-center self-center my-2">
              <Ionicons name="ios-download-outline" size={14} color="#64748b" />
              <Text className="text-slate-500 font-semibold">Save Workout</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ExerciseListModal />
    </SafeAreaView>
  );
};

export default HomeScreen;
