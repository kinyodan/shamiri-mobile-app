import React from 'react';
import { View, Text, StyleSheet,ScrollView,TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRoute, useFocusEffect } from "@react-navigation/native"
import FloatingMenuBar from "../components/FloatingMenuBar"
import globalStyles from "../styles"
import JournalCard from "../components/JournalCard"
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthenticationUtils from '../services/AuthenticationUtils';
import journalsService from '../services/journalsService'
import TopBar from '../components/TopBar'

const JournalsList = ({navigation }) => {

  const route = useRoute()
  const [local_journals, setjournals] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [hasFocused, setHasFocused] = useState(false);
  
  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.triggerHasFocused) {
        setHasFocused(false)
      }
    }, [route.params?.triggerHasFocused])
  );

  useFocusEffect(
    React.useCallback(() => {
      if (!hasFocused) {
        const fetchData = async () => {
          const accessToken = await AuthenticationUtils.getAccessToken()
          if (accessToken){
            const journals = await journalsService.getJournals(accessToken)
            setjournals(journals)
      
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

  const navigateToNew = () => {
    navigation.navigate('NewJournal', {name: 'NewJournal', navigation: navigation })
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopBar navigation={navigation} />
      <ScrollView style={globalStyles.scrollView }>
        <View style={styles.container}>
            <View style={styles.container}>
              {local_journals.map((item) => 
                <JournalCard key={item.id} item={item} navigation={navigation}/>
              )}
              <View  style={{height:120}}></View>
            </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.floatingButton} onPress={() => navigateToNew()}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
      
      <FloatingMenuBar navigation={navigation}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  floatingButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f05a28',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 76,
    right: 30,
    elevation: 5,
  },
  floatingButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },

});

export default JournalsList;
