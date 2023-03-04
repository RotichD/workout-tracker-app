import React from "react";
import { View } from "react-native";
import { Skeleton } from "@rneui/base";

const SkeletonCards = () => {
  return (
    <>
      <View className=" animate-bounce bg-slate-300 flex-1 mx-8 my-2 rounded-lg h-5 justify-center">
        <Skeleton height={70} />
      </View>
      <View className=" animate-bounce bg-slate-300 flex-1 mx-8 my-2 rounded-lg h-5 justify-center">
        <Skeleton height={70} />
      </View>
      <View className=" animate-bounce bg-slate-300 flex-1 mx-8 my-2 rounded-lg h-5 justify-center">
        <Skeleton height={70} />
      </View>
    </>
  );
};

export default SkeletonCards;
