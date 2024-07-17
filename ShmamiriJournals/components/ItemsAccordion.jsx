import React, { useState } from 'react';
import {StyleSheet, View, Text } from 'react-native';
import { Accordion } from 'react-native-animated-accordion';
import JournalCard from "../components/JournalCard"

const ItemsAccordion = ({ navigation, title, items }) => { 

  return (
    <View style={styles.mainContainer}>
      <Accordion headerText={title}>
        <View style={{ padding: 10 }}>
        {items.map((item) => 
          <JournalCard key={item.id} item={item} navigation={navigation}/>
        )}
        </View>
      </Accordion>
    </View>
  );
  
};

const styles = StyleSheet.create({
  mainContainer:{
    padding: 10,
  }

})
export default ItemsAccordion;