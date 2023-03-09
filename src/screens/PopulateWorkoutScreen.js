import React, { useContext } from "react";
import { View, Text, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Context as ExerciseContext } from "../context/ExerciseContext";
import AddExerciseListeItem from "../components/AddExerciseListeItem";
import { useNavigation } from "@react-navigation/native";


const PopulateWorkoutScreen = () => {
    const navigation = useNavigation();
  const {
    state: { exercises },
  } = useContext(ExerciseContext);

  return (
    <View className="flex-1 items-center justify-center bg-gray-800/70">
      <View className="w-screen p-8 justify-center">
        <FlatList
          data={exercises}
          renderItem={({ item }) => <AddExerciseListeItem data={item} />}
          keyExtractor={(item) => item.id}
        />
        <TouchableOpacity
          onPress={navigation.goBack()}
          className="p-2 bg-amber-500 rounded-b-lg"
        >
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PopulateWorkoutScreen;
