import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { Slider } from "@rneui/themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Pickers from "../components/Pickers";
import Sliders from "../components/Sliders";

const WorkoutAttemptScreen = ({ route }) => {
  const exerciseDetails = route.params.exerciseObj;

  const [sets, setSets] = useState(1);
  const [reps, setReps] = useState(1);
  const [sliderValues, setSliderValues] = useState(new Array(sets).fill(0));
  const totalReps = sliderValues.reduce((acc, curr) => acc + curr);
  const repsGoal = reps * sets;
  const performance = Math.floor((totalReps / repsGoal) * 100);
  let style = "";

  if (performance < 85) {
    style = "text-red-700";
  } else if (performance >= 85 && performance < 95) {
    style = "text-yellow-700";
  } else {
    style = "text-green-700";
  }

  useEffect(() => {
    setSliderValues(new Array(sets).fill(0));
  }, [sets]);

  const handleSliderChange = (value, index) => {
    const newSliderValues = [...sliderValues];
    newSliderValues[index] = value;
    setSliderValues(newSliderValues);
  };

  const onSetsChange = (setsValue) => {
    setSets(setsValue);
  };

  const onRepsChange = (repsValue) => {
    setReps(repsValue);
  };

  const header = () => (
    <View>
      <View className="flex-row justify-center items-center pt-2">
        <Text className="text-xl font-bold truncate mr-1">
          {exerciseDetails.name}
        </Text>
        {exerciseDetails.isBodyWeight ? (
          <MaterialCommunityIcons
            name="human-handsup"
            size={24}
            color="black"
          />
        ) : (
          <Ionicons name="ios-barbell" size={24} color="black" />
        )}
      </View>
      <Text className="text-slate-600 text-center">
        {exerciseDetails.muscleGroup}
      </Text>
    </View>
  );

  const details = () => (
    <View className="flex-row justify-center">
      <Text className="font-semibold text-slate-600">Previous: </Text>
      <Text className="text-slate-600">4 Sets of 8 Reps at 99%</Text>
    </View>
  );

  const stats = () => (
    <View className="items-center mb-5">
      <View className="flex-row items-center justify-center">
        <Text className="text-slate-600 font-semibold">Total Reps: </Text>
        <Text className="text-slate-600">{totalReps}</Text>
      </View>
      <View className="flex-row items-center justify-center">
        <Text className="text-slate-600 font-semibold">Performance: </Text>
        <Text className={`${style}`}>{performance}%</Text>
      </View>
    </View>
  );

  return (
    <ScrollView className="px-4">
      {header()}
      {details()}
      <Pickers
        sets={sets}
        reps={reps}
        setsChange={onSetsChange}
        repsChange={onRepsChange}
      />
      <Sliders
        onSlide={handleSliderChange}
        sliderValues={sliderValues}
        reps={reps}
      />
      {stats()}
    </ScrollView>
  );
};

export default WorkoutAttemptScreen;
