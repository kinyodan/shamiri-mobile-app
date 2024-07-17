import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Button, Card } from 'react-native-paper';
import moment from 'moment';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const JournalListCard = ({navigation,item }) => {

    const navigateToJournal = () => {
      navigation.navigate('Journal', {name: 'Journal', navigation: navigation ,item: item})
    }
    const formattedDateTime =(date)=> moment(date).format('MMMM Do YYYY, h:mm:ss a');

    return (
        <View style={styles.cardItem} key={item.id}>
            <TouchableOpacity onPress={() => navigateToJournal()}>
                <Card  key={item.id}>
                    <Card.Title subtitle={item.category} left={LeftContent} />
                    <Card.Cover source={{ uri: 'https://picsum.photos/500' }} />
                    <Card.Content style={styles.cardItemContent}>
                        <Text  style={styles.cardItemTitle} variant="titleLarge">{item.title}</Text>
                        <Text style={styles.date}>{formattedDateTime(item.date)}</Text>
                        <Text variant="bodyMedium"  numberOfLines={2}>{item.content} </Text>
                    </Card.Content>
                    <Card.Actions></Card.Actions>
                </Card>
            </TouchableOpacity>
        </View>
    )

}
const styles = StyleSheet.create({
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
    cardItem:{
        marginBottom: 20,
        marginTop: 10
    },
    cardItemContent:{
        padding:10,
    },
    cardItemTitle:{
        padding:8,
        fontSize:19,
    },
    date: {
        fontSize: 12,
        color: 'gray', 
        marginTop: 5, 
        paddingBottom:10,
    },


})


export default JournalListCard;
