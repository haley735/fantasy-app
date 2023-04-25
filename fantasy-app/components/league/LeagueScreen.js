import "react-native-gesture-handler";
import Animated,{interpolate} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import React from "react";
import { Button, View, Text} from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnalyticsScreen from "./Analytics";
import PlayersListScreen from "./PlayersList";
import MyNewsScreen from "./MyNewsScreen";
import RosterScreen from "./RosterScreen";
import MatchUpScreen from "./MatchUpScreen";
import data from '../LEAGUE_MOCK_DATA.json';

const Tab = createBottomTabNavigator();
console.log(data);

function LeagueDetailsScreen ({route}){
  const navigation = useNavigation();
  const leagueDetails = route.params;
  const leagueId = leagueDetails.id;
  const leagueObj = data.find(x => x.id === leagueId);
  const members = leagueObj.members;
  console.log(members);
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>League Details Screen</Text>
      </View>
    );
  }


export default function LeagueScreen({ route }) {
    const navigation = useNavigation();
    const params = route.params;
    const leagueDetails = params.leagueObj;
    const roster = leagueDetails.num_roster.roster;

    const onLayout=(event)=> {
        const {x, y, height, width} = event.nativeEvent.layout;
        // console.log(x);
        // console.log(y);
        // console.log(height);
        // console.log(width);

      }
    

  return (
    <>
    <View style={{flex: 1}} onLayout={onLayout}>
        
            <Tab.Navigator initialRouteName="LeagueDetails">
                <Tab.Screen name="League Details" component={LeagueDetailsScreen} initialParams={leagueDetails} />
                <Tab.Screen name="Team" component={RosterScreen} initialParams={roster} />
                <Tab.Screen name="Matchup" component={MatchUpScreen} />
                <Tab.Screen name="Players" component={PlayersListScreen} />
                <Tab.Screen name="My News" component={MyNewsScreen} />
                <Tab.Screen name="Analytics" component={AnalyticsScreen} />
            </Tab.Navigator>



    </View>
    </>
    
  );
}