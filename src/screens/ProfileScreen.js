import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '@rneui/base';
import { auth, signOut } from '../../firebase';

const ProfileScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Profile Screen</Text>
      <Button
        title='Log out'
        onPress={() => {
          signOut(auth)
            .then(() => {
              navigation.navigate('AuthStack');
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorCode, errorMessage);
            });
        }}
      />
    </View>
  );
};

export default ProfileScreen;
