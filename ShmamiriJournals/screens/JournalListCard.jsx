import React, {useEffect, useState,useCallback } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import AuthenticationUtils from "../services/AuthenticationUtils"
import AxiosService from "../services/AxiosService"
import JournalUtils from '../services/JournalUtils';
import BottomTabNavigation from './BottomTabNavigation';

const JournalListCard = ({ journals ,navigation}) => {
  const [token,setToken] = useState(false)
  const [journalData, setJournalData] = useState(false)
  const [responseMessage,setResponseMesage] = useState(false)
  const isFocused = useIsFocused();

    async function getInitialData() {
      const accessToken = await AuthenticationUtils.getAccessToken()
      setToken(accessToken)
       console.log(accessToken)    

       const headers =  {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }

       const response = await AxiosService.postDataToApi("list_journals",headers,{limit: 100})
       response ? setJournalData(response) : null
       console.log(journalData)    
       console.log(response)    
      }

  useEffect(() => {
    console.log("called");

    // Call only when screen open or when back on screen 
    if(isFocused){ 
        getInitialData();
    }
}, [journals,navigation, isFocused]);


  const renderJournalItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text>{token}</Text>
        <FlatList
          data={journals}
          renderItem={renderJournalItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      </View>
      <BottomTabNavigation></BottomTabNavigation>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  list: {
    flexGrow: 1,
  },
  item: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#555',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
});

export default JournalListCard;
