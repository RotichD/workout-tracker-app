import React, { useState, useContext, useEffect } from "react";
import { Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { Skeleton } from "@rneui/themed";

import ExerciseModalForm from "../components/ExerciseModal";
import ExerciseCard from "../components/ExerciseCard";

import { Context as ExerciseContext } from "../context/ExerciseContext";
import { collection, db, auth, onSnapshot } from "../../firebase";

const ExercisesScreen = () => {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
        setIsLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const title = () => (
    <Text className="text-3xl text-center font-bold text-gray-900 my-5 shadow-amber-400">
      My Exercises
    </Text>
  );

  const addExerciseButton = () => (
    <TouchableOpacity
      className="bg-amber-400 shadow-md my-2 mx-8 rounded-lg p-5 flex flex-row items-center justify-between"
      onPress={toggleModal}
    >
      <Text className="font-semibold text-slate-600">Add Exercise</Text>
      <Entypo name="add-to-list" size={24} color="black" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {title()}
      {addExerciseButton()}
      {isLoading ? (
        <>
          <Skeleton
            style={{ alignSelf: "center", marginVertical: 5, }}
            width={310}
            height={70}
          />
          <Skeleton
            style={{ alignSelf: "center", marginVertical: 5 }}
            width={310}
            height={70}
          />
          <Skeleton
            style={{ alignSelf: "center", marginVertical: 5 }}
            width={310}
            height={70}
          />
        </>
      ) : null}
      <FlatList
        data={exercises}
        renderItem={({ item }) => <ExerciseCard data={item} />}
        keyExtractor={(item) => item.id}
        className="flex-1 px-8"
      />
      <ExerciseModalForm />
    </SafeAreaView>
  );
};

export default ExercisesScreen;
