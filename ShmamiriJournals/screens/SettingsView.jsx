import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native'
import { useFocusEffect } from "@react-navigation/native"
import AxiosService from '../services/AxiosService'
import FloatingMenuBar from '../components/FloatingMenuBar'
import AuthenticationUtils from '../services/AuthenticationUtils'

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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#DCDCDC',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
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
    backgroundColor: '#00b5ec',
  },
  loginText: {
    color: 'white',
  },
})

export default SettingsView;
