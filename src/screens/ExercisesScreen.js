import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
  View,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const ExercisesScreen = () => {
  const [isVisible, setSetIsVisible] = useState(false);
  const [muscleGroup, setMuscleGroup] = useState('');
  const [name, setName] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  }

  const toggleModal = () => {
    setSetIsVisible(!isVisible);
  };

  const handleSubmit = () => {
    console.log(`Submitted: ${name}`);
    setSetIsVisible(false);
  };

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
    },
  ];

  const ExerciseModalForm = () => (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isVisible}
      onRequestClose={() => setSetIsVisible(false)}
    >
      <View className='flex-1 items-center justify-center bg-gray-800/70'>
        <View className='border bg-white p-8 rounded-lg w-80'>
          <Text>Exercise Name</Text>
          <TextInput
            className='border-2 border-gray-400 rounded-md p-2'
            value={name}
            onChangeText={setName}
            placeholder='Bench Press'
          />
          <Text>Muscle Group</Text>
          <TextInput
            className='border-2 border-gray-400 rounded-md p-2'
            value={muscleGroup}
            onChangeText={setMuscleGroup}
            placeholder='Push'
          />
          <TouchableOpacity onPress={toggleCheckbox} className='flex-row items-center'>
            <View className={`w-6 h-6 border-2 rounded-sm mr-2`}>
            {isChecked && <View className='w-4 h-4 bg-white rounded-sm'/>}
            </View>
          </TouchableOpacity>
          <Button title='Cancel' onPress={toggleModal} color='gray' />
          <Button title='Submit' onPress={handleSubmit} color='blue' />
        </View>
      </View>
    </Modal>
  );

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
      <Text className='text-3xl text-center font-bold text-gray-900 my-5 shadow-amber-400'>
        My Exercises
      </Text>
      <TouchableOpacity
        className='bg-amber-400 shadow-md my-2 mx-8 rounded-lg p-5 flex flex-row items-center justify-between'
        onPress={toggleModal}
      >
        <Text className='font-semibold text-slate-600'>Add Exercise</Text>
        <Entypo name='add-to-list' size={24} color='black' />
      </TouchableOpacity>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        className='flex-1 px-8'
      />
      {ExerciseModalForm()}
    </SafeAreaView>
  );
};

export default ExercisesScreen;
