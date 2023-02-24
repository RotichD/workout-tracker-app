import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, Input } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';
import Spacer from '../components/Spacer';
import { auth, signInWithEmailAndPassword } from '../../firebase';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = () => {
      try {
        setIsLoading(true);
        auth.onAuthStateChanged((userCredential) => {
          if (userCredential) {
            navigation.replace('AppStack');
          }
        });
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    unsubscribe();

    return unsubscribe;
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (error) {
      setError('Something went wrong :(');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' />
      {isLoading ? (
        <ActivityIndicator size='large' />
      ) : (
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
          {error && (
            <Text style={{ color: 'red', alignSelf: 'center' }}>{error}</Text>
          )}
          <Spacer>
            <Button
              containerStyle={styles.button}
              onPress={handleLogin}
              title='Login'
            />
            <Button
              title='Register'
              onPress={() => navigation.navigate('Register')}
              type='outline'
            />
          </Spacer>
        </Spacer>
      )}
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
