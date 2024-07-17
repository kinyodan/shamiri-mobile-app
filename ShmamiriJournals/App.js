import React, { useEffect, useState } from 'react';
import './lib/gesture-handler';
import {StyleSheet, View,ActivityIndicator,StatusBar } from 'react-native';
import axios from 'axios';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { EXPO_PUBLIC_API_URL } from '@env';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import LoginView from "./screens/LoginView"
import JournalsList from './screens/JournalsList';
import SignUpView from './screens/SignUpView'
import SettingsView from "./screens/SettingsView"
import NewJournal from "./screens/NewJournal"
import Journal from "./screens/Journal"
import FilterJournals from "./screens/FilterJournals"
import Categories from "./screens/Categories"
import EditJournal from "./screens/EditJournal"
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons/faSquareCheck'
import { faSave } from '@fortawesome/free-solid-svg-icons/faSave'

library.add(fab, faSquareCheck,faSave)

const image = { uri: "https://docs.expo.dev/static/images/tutorial/background-image.png" };


const Drawer = createDrawerNavigator();
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
            Authorization: ``, 
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
        <SafeAreaProvider>
          <StatusBar />
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
  );

}

const RootNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="-">
      <Drawer.Screen name="-" component={MainStackNavigator} />
      <Drawer.Screen name="Settings" component={SettingsView} />
    </Drawer.Navigator>
  );
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginView} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUpView} options={{ headerShown: false }} />
      <Stack.Screen name="Journals" component={JournalsList} options={{ headerShown: false }} />
      <Stack.Screen name="NewJournal" component={NewJournal} options={{ headerShown: false }} />
      <Stack.Screen name="EditJournal" component={EditJournal} options={{ headerShown: false }} />
      <Stack.Screen name="Journal" component={Journal} options={{ headerShown: false }} />
      <Stack.Screen name="FilterJournals" component={FilterJournals} options={{ headerShown: false }} />
      <Stack.Screen name="Categories" component={Categories} options={{ headerShown: false }} />
    </Stack.Navigator>
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
