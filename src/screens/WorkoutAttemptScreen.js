import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Pickers from "../components/Pickers";
import Sliders from "../components/Sliders";

const WorkoutAttemptScreen = ({ route }) => {
  const exerciseDetails = route.params.exerciseObj;

  const [sets, setSets] = useState(1);
  const [reps, setReps] = useState(1);

  //To map over for Picker. 2.5lb Increments
  const [weight, setWeight] = useState(25);
  const weights = Array.from(Array(100), (_, i) => (i + 1) * 2.5);

  // Creates State for Multiple Sliders determined by the state of sets
  const [sliderValues, setSliderValues] = useState(new Array(sets).fill(0));
  const [maxValue, setMaxvalue] = useState(reps);

  // State of stats
  const totalReps = sliderValues.reduce((acc, curr) => acc + curr);
  const repsGoal = reps * sets;
  const performance = Math.floor((totalReps / repsGoal) * 100);
  const volume = totalReps * weight;

  // Changes Text color based on performance
  let style = "";
  if (performance < 85) {
    style = "text-red-700";
  } else if (performance >= 85 && performance < 95) {
    style = "text-yellow-700";
  } else {
    style = "text-green-700";
  }

  //Ensures Sliders are Reset if user changes Reps
  useEffect(() => {
    setMaxvalue(reps);
    setSliderValues(new Array(sets).fill(0));
  }, [sets, reps]);

  const handleSliderChange = (value, index) => {
    const newSliderValues = [...sliderValues];
    newSliderValues[index] = value;
    setSliderValues(newSliderValues);
  };

  const onWeightChange = (weightsValue) => {
    setWeight(weightsValue);
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
    <View className="items-center mb-2">
      <View className="flex-row items-center justify-center">
        <Text className="text-slate-600 font-semibold">Total Reps: </Text>
        <Text className="text-slate-600">{totalReps}</Text>
      </View>
      <View className="flex-row items-center justify-center">
        <Text className="text-slate-600 font-semibold">Performance: </Text>
        <Text className={`${style}`}>{performance}%</Text>
      </View>
      {!exerciseDetails.isBodyWeight && (
        <View className="flex-row items-center justify-center">
          <Text className="text-slate-600 font-semibold">Volume: </Text>
          <Text className={`text-slate-600`}>{volume} lbs</Text>
        </View>
      )}
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
        isBodyWeight={exerciseDetails.isBodyWeight}
        weight={weight}
        weights={weights}
        weightChange={onWeightChange}
      />
      <Sliders
        onSlide={handleSliderChange}
        sliderValues={sliderValues}
        reps={reps}
        maxValue={maxValue}
      />
      {stats()}
      {totalReps > 0 && (
        <TouchableOpacity className="bg-amber-500 p-2 rounded-md flex-row justify-center items-center my-2 justify-self-end">
        <Ionicons name="ios-download-outline" size={14} color="black" />
        <Text className=" font-semibold">Save Attempt</Text>
      </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default WorkoutAttemptScreen;
