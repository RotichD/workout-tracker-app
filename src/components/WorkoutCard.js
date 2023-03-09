import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const WorkoutCard = ({ data }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="bg-amber-400 shadow-md my-2 rounded-lg p-5 flex flex-row justify-between mx-6"
      onPress={() =>
        navigation.navigate("WorkoutAttemptScreen", { exerciseObj: data })
      }
    >
      <View className="flex flex-1">
        <Text className="font-semibold text-slate-900 truncate">
          {data.name}
        </Text>
        <Text className="text-slate-600">{data.muscleGroup}</Text>
      </View>
      <View>
        {data.isBodyWeight ? (
          <MaterialCommunityIcons
            name="human-handsup"
            size={24}
            color="black"
          />
        ) : (
          <Ionicons name="ios-barbell" size={24} color="black" />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default WorkoutCard;
