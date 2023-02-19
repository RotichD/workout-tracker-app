import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, Input } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';
import Spacer from '../components/Spacer';
import { auth } from '../../firebase';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace('AppStack');
      }
    });

    return unsubscribe;
  }, []);

  const signIn = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' />
      <Spacer>
        <Text h2 style={styles.header}>
          Login
        </Text>
        <Spacer />
        <Input
          autoFocus
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
        />
        <Spacer>
          <Button
            containerStyle={styles.button}
            onPress={() => {}}
            title='Login'
          />
          <Button
            title='Register'
            onPress={() => navigation.navigate('Register')}
            type='outline'
          />
        </Spacer>
      </Spacer>
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
  button: {
    marginBottom: 10,
  },
});

export default LoginScreen;
