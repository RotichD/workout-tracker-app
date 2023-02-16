import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SigninScreen from '../src/screens/SigninScreen';
import SignupScreen from '../src/screens/SignupScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Signin' component={SigninScreen} />
      <Stack.Screen name='Signup' component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
