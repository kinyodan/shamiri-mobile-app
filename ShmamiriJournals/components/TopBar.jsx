import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity  } from 'react-native';
import AuthenticationUtils from '../services/AuthenticationUtils';

const TopBar = ({navigation}) => {

    const handleLogout = async () => {
        console.log("handleLogout")
        const isStoredTokenRemoved = await AuthenticationUtils.removeStoredToken()
        console.log(isStoredTokenRemoved)
        isStoredTokenRemoved ? navigation.navigate('Login', {name: 'Login'}) : null
    };
    
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.purpleOutlineButton} onPress={handleLogout}>
                <Text style={styles.purpleOutlineButtonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: 10,
        paddingVertical: 10,
        backgroundColor: '#f8f8f8', 
    },
   input: {
    backgroundColor: '#ffffff', 
    borderWidth: 1,
    borderColor: '#e0e0e0', 
    height: 50,
    borderBottomColor: '#FFFFFF',
    paddingHorizontal: 10,
  },
  purpleOutlineButton: {
    backgroundColor: '#d3d3d3',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  purpleOutlineButtonText: {
    color: '#800080',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TopBar;