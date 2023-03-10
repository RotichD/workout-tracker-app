import React, { useState } from "react";
import { View, Text } from "react-native";
import { Slider } from "@rneui/themed";


const Sliders = ({ onSlide, reps, sliderValues }) => {

  return (
    <View className="mr-2">
      {sliderValues.map((sliderValue, index) => (
        <View key={index}>
          <Text className="text-slate-600 text-center">
            Set {index + 1}: {sliderValue} Reps
          </Text>
          <Slider
            minimumValue={0}
            maximumValue={reps}
            step={1}
            value={sliderValue}
            thumbTintColor="#f59e0b"
            onValueChange={(value) => onSlide(value, index)}
          />
        </View>
      ))}
    </View>
  );
};

export default Sliders;
