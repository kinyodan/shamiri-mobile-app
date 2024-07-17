import React from 'react';
import { View, TextInput, StyleSheet,Dimensions  } from 'react-native';
 
const { height } = Dimensions.get('window');

const NormalTextINput = (props) => {

    return (
        <View style={styles.container}>
            <TextInput 
             placeholder={props.placeholder} 
             style={styles.input} />
        </View>
    );
};

const styles = StyleSheet.create({
   input: {
    backgroundColor: '#ffffff', 
    borderWidth: 1,
    borderColor: '#e0e0e0', 
    borderRadius: 10,
    height: 50,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default NormalTextINput;
