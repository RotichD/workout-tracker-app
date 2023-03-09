import React, { useState } from "react";
import { SafeAreaView, KeyboardAvoidingView, StyleSheet } from "react-native";
import { Text, Button, Input } from "@rneui/themed";
import Spacer from "../components/Spacer";
import { StatusBar } from "expo-status-bar";
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  addDoc,
  doc,
  db,
  collection,
  setDoc,
} from "../../firebase";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createUserDocument = async (uid) => {
    const usersRef = collection(db, 'users')
    try {
      const newUserDocRef = doc(usersRef, uid)
      await setDoc(newUserDocRef, {
        username: name,
        userID: uid,
      })
    } catch (err) {
      console.log(err)
    }
  } 

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User account created successfully
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name,
        });
        return user.uid;
      })
      .then((uid) => {
        createUserDocument(uid);
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
      <StatusBar style="dark" />
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Spacer>
          <Text h2 style={styles.header}>
            Sign Up
          </Text>
          <Spacer />
          <Input
            autoFocus
            autoCorrect={false}
            placeholder="Name"
            onChangeText={setName}
            type="text"
            value={name}
          />
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Email"
            onChangeText={setEmail}
            type="email"
            value={email}
          />
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Password"
            onChangeText={setPassword}
            secureTextEntry
            type="password"
            value={password}
            onSubmitEditing={register}
          />
          <Spacer>
            <Button title="Register" onPress={register} raised />
          </Spacer>
        </Spacer>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 150,
    marginTop: 50,
  },
  header: {
    marginLeft: 10,
    alignItems: "center",
  },
});

export default RegisterScreen;
