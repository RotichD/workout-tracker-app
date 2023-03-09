import React from "react";
import { View } from "react-native";
import { Button, Text } from "@rneui/base";
import { auth, signOut } from "../../firebase";
import Spacer from "../components/Spacer";

const ProfileScreen = ({ navigation }) => {
  const user = auth.currentUser;
  const name = user.displayName;
  return (
    <View>
      <Spacer>
        <Text h3>{name}</Text>
        <Button
          title="Log out"
          onPress={() => {
            signOut(auth)
              .then(() => {
                navigation.replace("AuthStack");
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
              });
          }}
        />
      </Spacer>
    </View>
  );
};

export default ProfileScreen;
