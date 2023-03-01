import React, { useState, useContext, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
  View,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import ExerciseModalForm from "../components/ExerciseModal";
import { Context as ExerciseContext } from "../context/ExerciseContext";
import { getDocs, collection, db, auth, doc, onSnapshot } from "../../firebase";

const ExercisesScreen = () => {
  const [exercises, setExercises] = useState([]);
  const { toggleModal } = useContext(ExerciseContext);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "users", auth.currentUser.uid, "exercises"),
      async (querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ id: doc.id, ...doc.data() });
        });
        setExercises(docs);
      }
    );

    return unsubscribe;
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity className="bg-amber-400 shadow-md my-2 rounded-lg p-5 flex flex-row justify-between">
      <View className="flex">
        <Text className="font-semibold text-slate-900 truncate">
          {item.name}
        </Text>
        <Text className="text-slate-600">{item.muscleGroup}</Text>
      </View>
      <View>
        {item.isBodyWeight ? (
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

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Text className="text-3xl text-center font-bold text-gray-900 my-5 shadow-amber-400">
        My Exercises
      </Text>
      <TouchableOpacity
        className="bg-amber-400 shadow-md my-2 mx-8 rounded-lg p-5 flex flex-row items-center justify-between"
        onPress={toggleModal}
      >
        <Text className="font-semibold text-slate-600">Add Exercise</Text>
        <Entypo name="add-to-list" size={24} color="black" />
      </TouchableOpacity>
      <FlatList
        data={exercises}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        className="flex-1 px-8"
      />
      <ExerciseModalForm />
    </SafeAreaView>
  );
};

export default ExercisesScreen;
