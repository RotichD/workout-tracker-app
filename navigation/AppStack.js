import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../src/screens/HomeScreen";
import ExercisesScreen from "../src/screens/ExercisesScreen";
import ProfileScreen from "../src/screens/ProfileScreen";
import ExerciseDetailScreen from "../src/screens/ExerciseDetailScreen";
import WorkoutAttemptScreen from "../src/screens/WorkoutAttemptScreen";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const ExerciseStack = createStackNavigator();
const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen
        name="WorkoutAttemptScreen"
        component={WorkoutAttemptScreen}
        options={{
          headerShown: true,
          headerBackTitle: "Back",
          headerTitle: "Workout Attempt",
          headerTintColor: "#f59e0b",
        }}
      />
    </HomeStack.Navigator>
  );
};

const ExerciseStackScreen = () => {
  return (
    <ExerciseStack.Navigator screenOptions={{ headerShown: false }}>
      <ExerciseStack.Screen name="ExerciseList" component={ExercisesScreen} />
      <ExerciseStack.Screen
        name="ExerciseDetail"
        component={ExerciseDetailScreen}
        options={{
          headerShown: true,
          headerBackTitle: "Back",
          headerTitle: "Details",
          headerTintColor: "#f59e0b",
        }}
      />
    </ExerciseStack.Navigator>
  );
};

const AppStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#f59e0b",
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "ios-home";
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === "Profile") {
            iconName = "ios-person";
            return <Ionicons name={iconName} size={size} color={color} />;
          } else {
            return (
              <MaterialCommunityIcons
                name="weight-lifter"
                size={24}
                color={color}
              />
            );
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Exercises" component={ExerciseStackScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default AppStack;
