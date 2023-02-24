import React from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
  View,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const ExercisesScreen = () => {
  const DATA = [
    {
      muscleGroup: 'Pull',
      name: 'Pull ups',
      id: '1',
      bodyWeight: true,
    },
    {
      muscleGroup: 'Push',
      name: 'Chest Press',
      id: '2',
      bodyWeight: false,
    },
    {
      muscleGroup: 'Push',
      name: 'Lateral Raise',
      id: '3',
      bodyWeight: false,
    },
    {
      muscleGroup: 'Push',
      name: 'Chest Dips',
      id: '4',
      bodyWeight: true,
    }
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity className='bg-amber-400 shadow-md my-2 rounded-lg p-5 flex flex-row justify-between'>
      <View className='flex'>
        <Text className='font-semibold text-slate-900 truncate'>
          {item.name}
        </Text>
        <Text className='text-slate-600'>{item.muscleGroup}</Text>
      </View>
      <View>
        {item.bodyWeight ? (
          <FontAwesome5 name='weight' size={24} color='black' />
        ) : (
          <MaterialCommunityIcons
            name='weight-lifter'
            size={24}
            color='black'
          />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <Text className='text-3xl text-center font-bold text-gray-900 my-5'>
        My Exercises
      </Text>
      <TouchableOpacity className='bg-amber-400 shadow-md my-2 mx-8 rounded-lg p-5 flex flex-row items-center justify-between'>
        <Text className='font-semibold text-slate-600'>Add Exercise</Text>
        <Entypo name='add-to-list' size={24} color='black' />
      </TouchableOpacity>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        className='flex-1 px-8'
      />
    </SafeAreaView>
  );
};

export default ExercisesScreen;
