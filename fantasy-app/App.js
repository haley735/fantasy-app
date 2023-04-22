import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack/";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./components/HomeScreen";
import AboutScreen from "./components/AboutScreen";
import ContactScreen from './components/ContactScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


export default function App() {
  return (
    <NavigationContainer>
      {/* <Tab.Navigator initialRouteName="Home"> */}
      <Drawer.Navigator initialRouteName="Home">

        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="About" component={AboutScreen} />
        <Tab.Screen name="Contact" component={ContactScreen} />
      </Drawer.Navigator>

      {/* </Tab.Navigator> */}
    </NavigationContainer>
  );
}

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text style={{ color: '#fff' }}>Open up App.js to start working on your app!</Text>
//       <StatusBar style="light" />
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
