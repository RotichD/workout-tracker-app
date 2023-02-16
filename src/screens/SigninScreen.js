import React from 'react';
import { View, Text, Button } from 'react-native';

const SigninScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Sign In</Text>
      <Button
        title='Go to Sign Up'
        onPress={() => navigation.navigate('Signup')}
      />
      <Button
        title='Go to Main Flow'
        onPress={() => navigation.navigate('AppStack')}
      />
    </View>
  );
};

export default SigninScreen;
