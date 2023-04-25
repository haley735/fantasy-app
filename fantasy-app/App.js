import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Animated,{interpolate} from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack/";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./components/HomeScreen";
import AboutScreen from "./components/AboutScreen";
import ContactScreen from './components/ContactScreen';
import LeagueListScreen from "./components/LeagueListScreen";
import LeagueScreen from "./components/league/LeagueScreen";
import { Button } from "react-native-web";
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import data from './USER_MOCK_DATA.json';
import { useContext, createContext } from "react";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

//get user data from MOCK_DATA.json and load into user object to pass to components
const user = JSON.parse(JSON.stringify(data));
export const context = createContext({user: user});
// // const context = useContext();
// console.log(context);

export default function App() {
  // navigation only for fantasy app; 
  // later on need connection to the athletic app for integration
  // navigation is complicated and would need more time to integration properly with existing system

  return (
    <>
  
    <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Leagues" component={LeagueListScreen} />
              <Stack.Screen name="League" component={LeagueScreen} option={{title: 'League'}}/>
            </Stack.Navigator>
      </NavigationContainer>

      </>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
