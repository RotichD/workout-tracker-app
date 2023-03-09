import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const HomeMenu = ({
  text,
  styles,
  leftIcon,
  rightIcon,
  leftBtnPress,
  rightBtnPress,
  leftBtnText,
  rightBtnText,
  color,
}) => {
  return (
    <View className={`flex-row justify-evenly ${styles}`}>
      <TouchableOpacity
        onPress={leftBtnPress}
        className={`h-13 w-36 flex-row items-center justify-center p-3 mr-1 rounded-xl ${color}`}
      >
        {leftIcon}
        <Text className={`text-${text}`}>{leftBtnText}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={rightBtnPress}
        className={`h-13 w-36 flex-row items-center justify-center p-3 ml-1 rounded-xl ${color}`}
      >
        {rightIcon}
        <Text className={`text-${text}`}>{rightBtnText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeMenu;
