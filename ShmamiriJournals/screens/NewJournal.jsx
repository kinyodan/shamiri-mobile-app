
import React from 'react';
import { View, Text, TextInput ,StyleSheet,ScrollView,TouchableOpacity , Dimensions } from 'react-native';
import { useState } from 'react';
import AxiosService from "../services/AxiosService"
import globalStyles from "../styles"
import AuthenticationUtils from "../services/AuthenticationUtils"
import FloatingMenuBar from "../components/FloatingMenuBar"
import DropDownPicker from 'react-native-dropdown-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons/faSave'
import TopBar from '../components/TopBar'

const { height } = Dimensions.get('window');
const TokenErrorMsg = "No access token or its expired you need to login"

const NewJournal = ({navigation}) => {
  const inputHeight = height * 0.25; 
  const [category, setSelectedCategory] = useState(null);
  const [title, onChangeTitle] = useState('');
  const [open, setOpen] = useState(false);
  const [content, onChangeContent] = useState("");
  const [postResponse, setLoginResponse] = useState(null)
  const [error, setError] = useState(false)
  
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
    {label: 'Pear', value: 'pear'},
] );

  const handlePost = async () => {
    const accessToken = await AuthenticationUtils.getAccessToken()
    const headers= {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    }
    const data = {title: title, content: content, category: category}
    if (accessToken){
      const response = await AxiosService.postDataToApi("new_journal",headers,data)
      response.message !== undefined ? setLoginResponse(response.message) : null
      navigation.navigate('Journals', {name: 'Journals',  token: accessToken }) 
    }else{
      setError({status: true, message: TokenErrorMsg})
      navigation.navigate('Login', {name: 'Login', error: error }) 
    }
  };

  return (
    <View>
      <TopBar navigation={navigation} />
      <ScrollView style={globalStyles.scrollView }>
        <TextInput
          placeholder="Title"
          style={styles.normalInput}
          value={title}
          onChangeText={(value) => onChangeTitle(value)}
        />
        <View styles={styles.contentContainer}>
           <TextInput
            multiline
            rows={10} 
            placeholder="Write your blog post..."
            style={[styles.contentTextInput, { height: inputHeight }]}
            textAlignVertical="top" 
            scrollEnabled={true} 
            value={content}
            onChangeText={(value) => onChangeContent(value)}
          />
        </View>
        <View style={styles.rowItemsCOntainer}>
              <View>
                <View style={styles.dropdownWrapper}>
                    <DropDownPicker
                        open={open}
                        value={category}
                        items={items}
                        setOpen={setOpen}
                        setValue={setSelectedCategory}
                        setItems={setItems}
                        placeholder={'Choose a fruit.'}
                        zIndex={1000}
                    />
                </View>
              </View>
              <View style={styles.contentSpacer}></View>
        </View>
        <TouchableOpacity style={styles.bottomButton} onPress={handlePost}>
          <Text style={styles.buttonText}>Submit</Text>
          <FontAwesomeIcon icon={faSave} size={20} color="white" style={styles.icon} />
        </TouchableOpacity>

      </ScrollView>
      <FloatingMenuBar navigation={navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  dateInput: {
    zIndex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#f0f0f0',
    marginLeft: 16,
    marginRight: 16,
    zIndex: 1,

  },
  scrollView:{
    height: 720,
    marginLeft:16,
    marginRight:16,
  },
  input: {
    backgroundColor: '#ffffff', 
    borderWidth: 1,
    borderColor: '#e0e0e0', 
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    zIndex: 1,

  },
  normalInput:{
    backgroundColor: '#ffffff', 
    borderWidth: 1,
    borderColor: '#e0e0e0', 
    borderRadius: 10,
    height: 50,
    borderBottomColor: '#FFFFFF',
    marginBottom: 20,
    marginTop: 20,
    paddingHorizontal: 10,
    zIndex: 1,

  },
  textInput: {
    backgroundColor: '#ffffff', 
    borderWidth: 1,
    borderColor: '#e0e0e0', 
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    zIndex: 1,

  },
  contentTextInput: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0', 
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: 'top', 
  },
  editor: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: 'top',
  },
  toolbar: {
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonContainer:{
    width: 160,
    alignSelf: 'flex-end',
  },
  bottomButton: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 20,
    width: 150,
    borderRadius: 30,
    backgroundColor: 'purple',
  },
  buttonText: {
    color: '#ffffff', 
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10, 
  },
  icon: {
    marginLeft: 5,
  },
  dropdownContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 10,
    justifyContent: 'center',
    zIndex: 1000, 
  },
  chosenFruitContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  rowItemsCOntainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentSpacer:{
    flex: 1,
  },
  dropdownWrapper:{
    padding:4,
    width: 300,
  },

})

export default NewJournal;