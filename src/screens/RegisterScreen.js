import React, { useState } from 'react';
import { SafeAreaView, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Text, Button, Input } from '@rneui/themed';
import Spacer from '../components/Spacer';
import { StatusBar } from 'expo-status-bar';
import { auth, createUserWithEmailAndPassword } from '../../firebase';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User account created successfully
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        // Handle error
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' />
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Spacer>
          <Text h2 style={styles.header}>
            Sign Up
          </Text>
          <Spacer />
          <Input
            autoFocus
            autoCorrect={false}
            placeholder='Name'
            onChangeText={setName}
            type='text'
            value={name}
          />
          <Input
            autoCapitalize='none'
            autoCorrect={false}
            placeholder='Email'
            onChangeText={setEmail}
            type='email'
            value={email}
          />
          <Input
            autoCapitalize='none'
            autoCorrect={false}
            placeholder='Password'
            onChangeText={setPassword}
            secureTextEntry
            type='password'
            value={password}
            onSubmitEditing={register}
          />
          <Spacer>
            <Button title='Register' onPress={register} raised />
          </Spacer>
        </Spacer>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 150,
  },
  header: {
    marginLeft: 10,
    alignItems: 'center',
  },
});

export default RegisterScreen;
