import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const ExerciseCard = ({ data }) => {
  return (
    <TouchableOpacity
      className="bg-amber-400 shadow-md my-2 rounded-lg p-5 flex flex-row justify-between"
    >
      <View className="flex flex-1">
        <Text className="font-semibold text-slate-900 truncate">
          {data.name}
        </Text>
        <Text className="text-slate-600">{data.muscleGroup}</Text>
      </View>
      <View>
        {data.isBodyWeight ? (
          <FontAwesome5 name="weight" size={24} color="black" />
        ) : (
          <MaterialCommunityIcons
            name="weight-lifter"
            size={24}
            color="black"
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ExerciseCard;
