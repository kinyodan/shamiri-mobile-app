import React from 'react';
import { View, TextInput, StyleSheet,Dimensions  } from 'react-native';
 
const { height } = Dimensions.get('window');

const JournalTextArea = (props) => {

    const inputHeight = height * 0.25; 

    return (
        <View style={styles.container}>
        <TextInput
            multiline
            rows={10} 
            placeholder="Write your blog post..."
            style={[styles.contentTextInput, { height: inputHeight }]}
            textAlignVertical="top" 
            scrollEnabled={true} 
        />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#f0f0f0',
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
});

export default JournalTextArea;
