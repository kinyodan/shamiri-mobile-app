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
import AxiosService from '../services/AxiosService'
import AuthenticationUtils from '../services/AuthenticationUtils'
import axios from 'axios'
import { EXPO_PUBLIC_API_URL } from '@env';


const LoginView = ({ navigation }) => {
  
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [loginResponse, setLoginResponse] = useState()
  const [error, setError] = useState('');
  const [journals, setjournals] = useState(false)

  const showAlert = viewId => Alert.alert('Alert', 'Button pressed ' + viewId)

  const getJournals = async (accessToken)=>{
      const response = await axios.get(`${EXPO_PUBLIC_API_URL}/list_journals`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data.data ? response.data.data : false
  }

  const handlePost = async () => {
    const data_f ={email: email["email"], password: password["password"]}
    const response = await AxiosService.postDataToApi("login",{},data_f)
    response.message !== undefined ? setLoginResponse(response.message) : null

    const accessToken = AuthenticationUtils.setResponseToken(response)
    const ResponseData = AuthenticationUtils.setResponseData(response)

    const journals = await getJournals(accessToken)
    setjournals(journals);
    accessToken ? navigation.navigate('Journals', {name: 'Journals', journals: journals, token: accessToken }) : null
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
          keyboardType="email-address"
          underlineColorAndroid="transparent"
          onChangeText={email => setEmail({ email })}
        />
      </View>

      <View style={styles.inputContainer}>
        <Image
          style={styles.inputIcon}
          source={{ uri: 'https://img.icons8.com/ios-glyphs/512/key.png' }}
        />
        <TextInput
          style={styles.inputs}
          placeholder="Password"
          secureTextEntry={true}
          underlineColorAndroid="transparent"
          onChangeText={password => setPassword({ password })}
        />
      </View>

      <TouchableOpacity
        style={[styles.buttonContainer, styles.loginButton]}
        onPress={()=> handlePost()}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <View><Text>{loginResponse}</Text></View>
        <View><Text>{error}{loginResponse}</Text></View>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => showAlert('forgot password')}>
        <Text>Forgot your password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() =>
          navigation.navigate('SignUp', {name: 'SignUp'})
        }>
        <Text>Sign up</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    position: "absolute"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
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

export default LoginView;
