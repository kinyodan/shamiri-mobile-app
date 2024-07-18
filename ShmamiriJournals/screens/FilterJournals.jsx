
import React from 'react';
import { View, Text, StyleSheet,ScrollView,ImageBackground,TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FloatingMenuBar from "../components/FloatingMenuBar"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import globalStyles from "../styles"
import WeeklyFiltered from '../screens/WeeklyFiltered';
import DailyFiltered from '../screens/DailyFiltered';
import MonthlyFiltered from '../screens/MonthlyFiltered';
import TopBar from '../components/TopBar'

const FilterJournals = ({navigation}) => {
  const [value, onChangeText] = React.useState('Useless Multiline Placeholder');
  const Tab = createMaterialTopTabNavigator();

  return (
    <View >
      <TopBar navigation={navigation} />
      <View style={styles.scrollView}>
        <Tab.Navigator>
          <Tab.Screen name="DailyFiltered" component={DailyFiltered} />
          <Tab.Screen name="WeeklyFiltered" component={WeeklyFiltered} />
          <Tab.Screen name="MonthlyFiltered" component={MonthlyFiltered} />
        </Tab.Navigator>
      </View>

      <FloatingMenuBar navigation={navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView:{
    height: 720,
}

})

export default FilterJournals;