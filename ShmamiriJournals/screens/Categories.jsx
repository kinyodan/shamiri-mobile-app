
import React, {useState} from 'react';
import { useFocusEffect } from "@react-navigation/native"
import {StyleSheet, Text, View, TextInput,ScrollView} from 'react-native';
import globalStyles from "../styles"
import FloatingMenuBar from '../components/FloatingMenuBar'
import journalsService from '../services/journalsService'
import AuthenticationUtils from '../services/AuthenticationUtils'
import ItemsAccordion from '../components/ItemsAccordion';
import TopBar from '../components/TopBar'

const Categories = ({navigation}) => {
  const [hasFocused, setHasFocused] = useState(false);
  const [journals, setjournals] = useState({});
  const [error, setError] = useState({});

  useFocusEffect(
    React.useCallback(() => {
      if (!hasFocused) {
        const fetchData = async () => {
          const accessToken = await AuthenticationUtils.getAccessToken()

          if (accessToken){
            const journals = await journalsService.getJournalsByCategory(accessToken)
            console.log(journals)
            journals ? setjournals(journals) : null
      
          }else{
            setError({status: true, message: ''})
            navigation.navigate('Login', {name: 'Login', error: error }) 
          }
        };
        fetchData()
        setHasFocused(true); 
      }
    },[navigation, hasFocused])
  )

  return (

  <View>
    <TopBar navigation={navigation} />
    <ScrollView style={globalStyles.scrollView }>
      {Object.entries(journals).map(([key, items]) => (
        <ItemsAccordion key={key}  navigation= {navigation} title={key} items={items}   />
      ))}
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
    height: 785,
    marginLeft:16,
    marginRight:16,
  },

})


export default Categories;