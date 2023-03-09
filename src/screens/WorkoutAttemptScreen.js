import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Slider } from "@rneui/themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Pickers from "../components/Pickers";

const WorkoutAttemptScreen = ({ route }) => {
  const exerciseDetails = route.params.exerciseObj;

  const [sets, setSets] = useState(1);
  const [reps, setReps] = useState(1);

  const onSetsChange = (setsValue) => {
    setSets(setsValue);
  };

  const onRepsChange = (repsValue) => {
    setReps(repsValue);
  };

  const header = () => (
    <View>
      <View className="flex-row justify-center items-center pt-2">
        <Text className="text-xl font-bold truncate">
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

  const SetsRepsPicker = ({ sets, reps }) => {
    const [sliderValues, setSliderValues] = useState(new Array(sets).fill(0));

    const handleSliderChange = (value, index) => {
      const newSliderValues = [...sliderValues];
      newSliderValues[index] = value;
      setSliderValues(newSliderValues);
    };

    const totalReps = sliderValues.reduce((acc, curr) => acc + curr);

    return (
      <View className='mr-2'>
        {sliderValues.map((sliderValue, index) => (
          <View key={index}>
            <Text className='text-slate-600 text-center'>Set {index + 1}: {sliderValue} Reps</Text>
            <Slider
              minimumValue={0}
              maximumValue={reps}
              step={1}
              value={sliderValue}
              thumbTintColor="#f59e0b"
              onValueChange={(value) => handleSliderChange(value, index)}
            />
          </View>
        ))}
        <Text>Total Reps: {totalReps}</Text>
      </View>
    );
  };

  return (
    <View className='px-4 '>
      {header()}
      {details()}
      <Pickers
        sets={sets}
        reps={reps}
        setsChange={onSetsChange}
        repsChange={onRepsChange}
      />
      <SetsRepsPicker sets={sets} reps={reps} />
    </View>
  );
};

export default WorkoutAttemptScreen;
