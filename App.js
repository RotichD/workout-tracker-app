import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./navigation/AuthStack";
import AppStack from "./navigation/AppStack";
// import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as ExerciseProvider } from "./src/context/ExerciseContext";

const Stack = createNativeStackNavigator();

export default App = () => {
  return (
    <ExerciseProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="AuthStack" component={AuthStack} />
          <Stack.Screen name="AppStack" component={AppStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </ExerciseProvider>
  );
};

// export default () => {
//   return (
//     // <AuthProvider>
//       <App />
//     {/* </AuthProvider> */}
//   )
// }
