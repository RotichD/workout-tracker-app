import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const AttemptCard = ({ detailObj, isBodyWeight, previousAttempt }) => {
  const isoString = detailObj.timestamp;
  const date = new Date(isoString);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const formattedDate = date.toLocaleString("en-US", options);

  const { sets, reps, weight, totalReps, repsGoal, performance, volume } =
    detailObj;

  let volumeDiff = null;
  if (previousAttempt !== null) {
    volumeDiff =
      (detailObj.volume - previousAttempt.volume) / previousAttempt.volume;
  }

  // Changes Text color based on performance
  let style = "";
  if (performance < 85) {
    style = "text-red-700";
  } else if (performance >= 85 && performance < 95) {
    style = "text-yellow-700";
  } else {
    style = "text-green-700";
  }

  const icon = () => (
    <>
      {volumeDiff > 0.1 ? (
        <Ionicons name="ios-trending-up" size={18} color="black" />
      ) : volumeDiff < -0.1 ? (
        <Ionicons name="ios-trending-down" size={18} color="black" />
      ) : (
        <MaterialCommunityIcons
          name="approximately-equal"
          size={18}
          color="black"
        />
      )}
    </>
  );

  return (
    <View className="bg-gray-300 shadow-sm my-2 rounded-lg p-5 justify-between">
      <View className="flex-row justify-between">
        <Text className=" font-semibold">Attempted on:</Text>
        <Text className="text-slate-800">{formattedDate}</Text>
      </View>
      <View className="flex-row justify-between items-center">
        <View className="flex-row">
          <Text className="font-semibold">{"Sets: "}</Text>
          <Text className="text-slate-800 mr-2">{sets}</Text>
          <Text className="font-semibold">{"Reps: "}</Text>
          <Text className="text-slate-800">{reps}</Text>
        </View>
        <View className="flex-row items-center">
          {!isBodyWeight ? (
            <>
              <Text className="font-semibold">{weight}</Text>
              <MaterialCommunityIcons
                name="weight-pound"
                size={18}
                color='"black"'
              />
            </>
          ) : (
            <MaterialCommunityIcons
              name="human-handsup"
              size={18}
              color="black"
            />
          )}
        </View>
      </View>
      <View className="flex-row items-center justify-between">
        <View className="flex-row">
          <Text className="font-semibold">Performance:</Text>
          <Text className="text-slate-800">
            {totalReps}/{repsGoal}
          </Text>
        </View>
        <Text className={`font-semibold ${style}`}>{performance}%</Text>
      </View>
      <View className="flex-row items-center justify-between">
        <View className="flex-row">
          <Text className="font-semibold">Volume: </Text>
          <Text className="text-slate-800">
            {volume} {isBodyWeight ? "reps" : "lbs"}
          </Text>
        </View>

        {previousAttempt !== null && icon()}
      </View>
    </View>
  );
};

export default AttemptCard;
