import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView
} from 'react-native'
import { useFocusEffect } from "@react-navigation/native"
import AxiosService from '../services/AxiosService'
import FloatingMenuBar from '../components/FloatingMenuBar'
import AuthenticationUtils from '../services/AuthenticationUtils'
import globalStyles from "../styles"
import TopBar from '../components/TopBar'

const userDataErrorMsg = "Problem retrieving user Details login Needed"

const SettingsView = ({navigation}) => {
  
  const [email, setEmail] = useState("")
  const [username, setUsername]= useState("")
  const [loginResponse, setLoginResponse] = useState()
  const [hasFocused, setHasFocused] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (!hasFocused) {
        const fetchData = async () => {
          const userData = await AuthenticationUtils.getResponseData()
          if (userData){
            setUsername(userData.userName)
            setEmail(userData.email)
      
          }else{
            setError({status: true, message: userDataErrorMsg})
            navigation.navigate('Login', {name: 'Login', error: error }) 
          }
              };
        fetchData()
        setHasFocused(true); 
      }
    },[navigation, hasFocused])
  )

  const handlePost = async () => {
    const accessToken = await AuthenticationUtils.getAccessToken()
    const headers= {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    }
    const data ={email: email, name: username }
    if (accessToken){
      const response = await AxiosService.postDataToApi("update_user",headers,data)
      response.message !== undefined ? setLoginResponse(response.message) : null
      AuthenticationUtils.setResponseToken(response)
      AuthenticationUtils.setResponseData(response)
      navigation.navigate('Journals', {name: 'Journals',  token: accessToken }) 
    }else{
      setError({status: true, message: TokenErrorMsg})
      navigation.navigate('Login', {name: 'Login', error: error }) 
    }
  };

  return (
    <>
    <TopBar navigation={navigation} />
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Image
          style={styles.inputIcon}
          source={{ uri: 'https://img.icons8.com/ios-filled/512/circled-envelope.png' }}
        />
        <TextInput
          style={styles.inputs}
          placeholder="Email"
          value={email}
          underlineColorAndroid="transparent"
          onChangeText={email => setEmail( email)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Image
          style={styles.inputIcon}
          source={{ uri: 'https://img.icons8.com/ios-filled/512/circled-envelope.png' }}
        />
        <TextInput
          style={styles.inputs}
          placeholder="Username"
          value={username}
          underlineColorAndroid="transparent"
          onChangeText={username => setUsername(username)}
        />
      </View>

      <TouchableOpacity
        style={[styles.buttonContainer, styles.loginButton]}
        onPress={() => handlePost()}>
        <Text style={styles.loginText}>Save</Text>
      </TouchableOpacity>
      <FloatingMenuBar navigation={navigation}/>
    </View>
    </>    

  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    height: 720,
    marginBottom: 20,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 720,
    marginBottom: 20,

  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#DCDCDC',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: 'purple',
  },
  loginText: {
    color: 'white',
  },
})

export default SettingsView;
