import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import JournalListCard from './JournalListCard';
import NewJournal from './NewJournal';
import SettingsView from "./SettingsView"

const Tab = createBottomTabNavigator();

function BottomTabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={JournalListCard} />
      <Tab.Screen name="NewJournal" component={NewJournal} />
      <Tab.Screen name="Settings" component={SettingsView} />

    </Tab.Navigator>
  );
}

export default BottomTabNavigation;
