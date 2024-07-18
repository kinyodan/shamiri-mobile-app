import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet ,StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TopMenuBar = ({navigation}) => {
      const handlePress = (screenName) => {
        navigation.navigate(screenName, {name: screenName, navigation: navigation })
      };
    
      return (
      <View style={styles.topBar}>
        <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
        <View style={styles.menuBar}>
          <TouchableOpacity style={styles.menuItem} onPress={() => handlePress('Categories')}>
            <Icon name="list" size={24} color="darkgrey" />
            <Text style={styles.menuItemText}>Category</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => handlePress('Journals')}>
            <Icon name="home" size={24} color="darkgrey" />
            <Text style={styles.menuItemText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => handlePress('FilterJournals')}>
            <Icon name="filter" size={24} color="darkgrey" />
            <Text style={styles.menuItemText}>Filter</Text>
          </TouchableOpacity>          
          <TouchableOpacity style={styles.menuItem} onPress={() => handlePress('Settings')}>
            <Icon name="gears" size={24} color="darkgrey" />
            <Text style={styles.menuItemText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
      );
};
    
const styles = StyleSheet.create({
    container: {
    flex: 1,
    paddingTop:5,
    backgroundColor: '#f0f0f0',
    height: 60,
    },
    menuItemText: {
      marginTop: 5,
      fontSize: 12,
      color: 'darkgrey',
      alignItems: 'center',
    },
    topBar: {
      position: "absolute",
      flex: 1,
      bottom: 8,
      left: 0,
      right: 0,
      height: 60,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 10,
      backgroundColor: '#f0f0f0', 
      zIndex: 1000, 
      elevation: 5, 
      paddingHorizontal: 10,
    },
    menuBar: {
    borderRadius: 40,
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
    },
    menuItem: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    },
    mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    },
    contentText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
    },
});

export default TopMenuBar;
