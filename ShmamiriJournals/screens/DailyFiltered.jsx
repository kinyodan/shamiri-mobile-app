import React from 'react';
import { View, Text, StyleSheet,ScrollView,TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRoute, useFocusEffect } from "@react-navigation/native"
import JournalCard from "../components/JournalCard"
import AuthenticationUtils from '../services/AuthenticationUtils';
import journalsService from '../services/journalsService'

const DailyFiltered = ({ navigation }) => {
    const [hasFocused, setHasFocused] = useState(false);
    const [journals, setjournals] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
          if (!hasFocused) {
            const fetchData = async () => {
              const accessToken = await AuthenticationUtils.getAccessToken()
    
              if (accessToken){
                const journals = await journalsService.getJournalsFIlteredByDaily(accessToken)
                console.log(journals)
                journals ? setjournals(journals) : null
          
              }else{
                setError({status: true, message: TokenErrorMsg})
                navigation.navigate('Login', {name: 'Login', error: error }) 
              }
                  };
            fetchData()
            setHasFocused(true); 
          }
        },[navigation, hasFocused])
    )

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
            <View style={styles.container}>
              {journals.map((item) => 
                <JournalCard key={item.id} item={item} navigation={navigation}/>
              )}
              <View  style={{height:120}}></View>
            </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
    scrollView:{
      height: 320,
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
    spacer: {
      height:120,
    },
    card_item:{
      marginBottom: 20,
      marginTop: 10
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
})

export default DailyFiltered;