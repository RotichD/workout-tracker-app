import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './navigation/AuthStack';
import AppStack from './navigation/AppStack';
//switch navigator
//stack navigator
//bottomtabnaviagtor

// Switch Navigator {
//LoginFlow -> Stack navigator switches between signup/signin
//mainFlow -> bottom tab Navigator between work/
// }

const Stack = createNativeStackNavigator();

export default App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='AuthStack' component={AuthStack} />
        <Stack.Screen name='AppStack' component={AppStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
