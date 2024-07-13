import React, { useEffect, useState } from 'react';
import {KeyboardAvoidingView,ImageBackground, StyleSheet, Text, View,ActivityIndicator } from 'react-native';
import axios from 'axios';
import { EXPO_PUBLIC_API_URL } from '@env';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginView from "./screens/LoginView"
import JournalListCard from './screens/JournalListCard';
import SignUpView from './screens/SignUpView'
const image = { uri: "https://docs.expo.dev/static/images/tutorial/background-image.png" };

const Stack = createStackNavigator();

export default function App() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${EXPO_PUBLIC_API_URL}/`, {
          headers: {
            Authorization: ``, // Add token if needed
            'Content-Type': 'application/json',
          },
        });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }


  if (error) {
    return (
      <View style={styles.container}>
        <Text>errors: {EXPO_PUBLIC_API_URL}</Text>
      </View>
    );
  }

  return (
   <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginView} />
      <Stack.Screen name="SignUp" component={SignUpView} />
      <Stack.Screen name="Journals" component={JournalListCard} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000a0',
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: '100%',
    marginBottom: 20,
  },

});
