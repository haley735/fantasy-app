import "react-native-gesture-handler";
import Animated,{interpolate} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { Button, View, Text} from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnalyticsScreen from "./Analytics";
import PlayersListScreen from "./PlayersList";
import MyNewsScreen from "./MyNewsScreen";
import RosterScreen from "./RosterScreen";
import MatchUpScreen from "./MatchUpScreen";
import data from '../LEAGUE_MOCK_DATA.json';
import playersTakenData from '../PLAYERS_TAKEN_MOCK_DATA.json';
import activePlayersData from '../ACTIVE_NFL_PLAYERS.json';

const Tab = createBottomTabNavigator();

function LeagueDetailsScreen ({route}){
  const navigation = useNavigation();
  const leagueDetails = route.params;
  const leagueId = leagueDetails.id;
  const leagueObj = data.find(x => x.id === leagueId);
  const members = leagueObj.members;
  function memberList(){
    return members.map((member, index) => {
      return (<Text key={index}>{member.first_name + ' ' + member.last_name}</Text>);
    });
  }

  
  useEffect(() => {
    navigation.setOptions({title: leagueObj.name})
  }, []);

    return (
      <React.Fragment>
        <View id="league-details" style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text>Team Members</Text>
          {memberList()}
        </View>
      </React.Fragment>
      
    );

    
  }

export default function LeagueScreen({ route }) {
    const navigation = useNavigation();
    const params = route.params;
    const leagueDetails = params.leagueObj;
    const roster = leagueDetails.num_roster.roster;
    const [availablePlayers, setAvailablePlayers] = useState([]);

    const onLayout = (event)=> {
      const {x, y, height, width} = event.nativeEvent.layout;
    }
    
    useEffect(() => {
      async function getAvailablePlayers(){
        const playersTaken = playersTakenData.data;
        let playersNames = [];
        Object.keys(playersTaken).forEach((key) => {
          playersNames.push(`${playersTaken[key].player.first_name} ${playersTaken[key].player.last_name}`);
        });
      
        const filtered = activePlayersData.items.filter((player) => {
          return player.active === true && 
          !playersNames.includes(player.fullName);
        });
        filtered.forEach(async (player) => {
          const res = await fetch(`https://site.web.api.espn.com/apis/common/v3/sports/football/nfl/athletes/${player.id}`);
          const playerInfo = await res.json();
          setTimeout(5000);
          // console.log(playerInfo);
          player.position = await playerInfo.athlete.position?.displayName || null;
          player.positionAbbr = await playerInfo.athlete.position?.abbreviation || null;
          player.teamAbbr = await playerInfo.athlete.team?.abbreviation || null;
          player.teamName = await playerInfo.athlete.team?.displayName || null;
          player.teamLogo = await playerInfo.athlete.team?.logos[0].href || null;
          player.headshot = await playerInfo.athlete.headshot?.href || playerInfo.athlete.team?.logos[0].href;

          // console.log(player);
          setTimeout(() => {
            
          }, 2000);
          return player;
        });
        // console.log('filtered: ', filtered);
        setAvailablePlayers(filtered);
        return filtered;
      }

      getAvailablePlayers();

    }, []);

  return (
    <>
    <View style={{flex: 1}} onLayout={onLayout}>
        
      <Tab.Navigator initialRouteName="LeagueDetails">
          <Tab.Screen name="League Details" component={LeagueDetailsScreen} initialParams={leagueDetails} />
          <Tab.Screen name="Team" component={RosterScreen} initialParams={roster} />
          <Tab.Screen name="Matchup" component={MatchUpScreen} />
          <Tab.Screen name="Players" component={PlayersListScreen} initialParams={availablePlayers} options={{title: "Available Players"}}/> 
          <Tab.Screen name="My News" component={MyNewsScreen} />
          <Tab.Screen name="Analytics" component={AnalyticsScreen} />
      </Tab.Navigator>

    </View>
    </>
    
  );
}