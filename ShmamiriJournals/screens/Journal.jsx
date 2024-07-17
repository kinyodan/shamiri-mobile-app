import React from 'react';
import { View, Text, StyleSheet,ScrollView,ImageBackground,TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from "@react-navigation/native"
import { useState } from 'react';
import { Avatar, Card } from 'react-native-paper';
import moment from 'moment';
import AuthenticationUtils from "../services/AuthenticationUtils"
import AxiosService from "../services/AxiosService"
import FloatingMenuBar from "../components/FloatingMenuBar"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit'
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'
const image = {uri: 'https://picsum.photos/500'};
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const ErrorMsg = "Error Deleting"
const Journal = ({navigation, item }) => {
  const [postResponse, setLoginResponse] = useState(null)
  const [error, setError] = useState(false)
  const route = useRoute()
  const journal = route.params?.item
  const formattedDateTime =(date)=> moment(date).format('MMMM Do YYYY, h:mm:ss a');

  const handleNavigation = async (screen) => {
    navigation.navigate(screen, {name: screen, journal: journal }) 
  };

  const handlePostDelete = async (journal_id) => {
    let navigateToScreen = "Journals"
    const accessToken = await AuthenticationUtils.getAccessToken()
    const headers= {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    }
    const data={id: journal_id}
    if (accessToken){
      const response = await AxiosService.postDataToApi(`delete_journal/${journal.id}`,headers,data)
      response.message !== undefined ? setLoginResponse(response.message) : null
    }else{
      setError({status: true, message: ErrorMsg})
      navigateToScreen = "Login"
    }
    navigation.navigate(navigateToScreen, { triggerHasFocused: true }) 
  };

  return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
           <View style={styles.container}>
              <View style={styles.titleView}>
                <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{journal.title}</Text>
                </View>
                </ImageBackground>
                <View style={styles.actionsContainer}>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.actionButton} onPress={()=> handleNavigation("EditJournal")}>
                      <FontAwesomeIcon icon={faEdit} size={24} color="darkgrey" />
                       <Text style={styles.actionText}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.content}>
                    <Card>
                        <Card.Title styles={styles.date} left={LeftContent} />
                        <Card.Content style={styles.contentInner}>
                          <Text style={styles.date}>{formattedDateTime(journal.date)}</Text>
                          <Text >{journal.content} </Text>
                        </Card.Content>
                        <Card.Actions>
                         <TouchableOpacity style={styles.actionButton} onPress={()=> handlePostDelete(journal.id)}>
                            <FontAwesomeIcon icon={faTrash} size={19} color="darkgrey" />
                          </TouchableOpacity>
                        </Card.Actions>
                    </Card>
                </View>
                <View  style={{height:120}}></View>
              </View>
           </View>
        </ScrollView>
        
        <FloatingMenuBar navigation={navigation}/>
      </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    scrollView:{
      height: 720
    },
    titleView: {
      flex: 1,
    },
    image:{
      height: 200,
      justifyContent: 'center', 
      alignItems: 'center', 
    },
    textContainer: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
    },
    text: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center', 
    },
  actionsContainer:{
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10
  },
  actions:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 15,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  actionText: {
    marginTop: 5,
    fontSize: 12,
    color: 'darkgrey',
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
  date: {
    fontSize: 12,
    color: 'gray', 
    marginTop: 5, 
    paddingBottom:10,
  },
  contentInner:{
    paddingBottom: 10,
  }
    
})


export default Journal;
