import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../firebase";

const HomeScreen = () => {
  const displayName = auth.currentUser.displayName;
  return (
    <SafeAreaView className="flex-1 pt-0">
      <Text className="text-3xl text-center font-bold text-gray-900 mt-5 shadow-amber-400">
        Welcome
      </Text>
      <Text className="text-center font-bold text-gray-500 shadow-amber-400">
        {displayName}
      </Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
