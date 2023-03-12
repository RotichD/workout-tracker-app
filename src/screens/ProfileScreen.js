import React from "react";
import { View, Text } from "react-native";
import { Button } from "@rneui/base";
import { auth, signOut } from "../../firebase";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = ({ navigation }) => {
  const user = auth.currentUser;
  const name = user.displayName;

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("AuthStack");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <SafeAreaView>
      <View classname='items-center justify-center p-8 border'>
        <Text classname="text-center ">{name}</Text>
        <Button title="Log out" onPress={handleSignout} />
      </View>
      <View classname='border p-8'></View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
