import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NoData = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nothing to show! but checking</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f9fa',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
      },
      text: {
        fontSize: 18,
        color: '#333',
      },
  })
  export default NoData