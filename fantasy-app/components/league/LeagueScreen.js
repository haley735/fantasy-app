import "react-native-gesture-handler";
import Animated,{interpolate} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { Button, View, Text, Modal, StyleSheet, Pressable} from "react-native";
import { DataTable } from 'react-native-paper';
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

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Verdana',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
      
  },
});

function LeagueDetailsScreen ({route}){
  const navigation = useNavigation();
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const leagueDetails = route.params;
  const leagueId = leagueDetails.id;
  const leagueObj = data.find(x => x.id === leagueId);
  const members = leagueObj.members;
  function memberList(){
    return members.map((member, index) => {
        return (
          <DataTable.Row key={index}>
              <DataTable.Cell>{index + 1}</DataTable.Cell>
              <DataTable.Cell>{member.first_name ? member?.first_name + ' ' + member?.last_name : null}</DataTable.Cell>
              <DataTable.Cell>{null}</DataTable.Cell>
          </DataTable.Row>              
      );
    });
  }

  
  useEffect(() => {
    navigation.setOptions({title: leagueObj.name})
  }, []);

    return (
      <React.Fragment>
        <View id="league-details" style={{ flexGrow: 0, flexBasis:"50%", alignItems: "center", justifyContent: "space-between" }}>
            {/* league settings modal */}
              <Modal
                animationType="slide"
                transparent={true}
                visible={settingsModalVisible}
                onRequestClose={() => {
                setSettingsModalVisible(!settingsModalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>League Settings</Text>
                        {/* */}
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setSettingsModalVisible(!settingsModalVisible)}>
                            <Text style={styles.textStyle}>Confirm</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setSettingsModalVisible(!settingsModalVisible)}>
                            <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <View style={{flexGrow: 0, flexShrink: 1, alignItems:"baseline", justifyContent: "space-around", flexDirection: "row"}}>
                <Button style={{borderRadius: 20, padding: 10, elevation: 2}}
                    title="League Settings"
                    onPress={() => setSettingsModalVisible(true)} />
                <Button style={{borderRadius: 20, padding: 10, elevation: 2}}
                    title="Add Players"
                    onPress={() => navigation.navigate("Players")} /> 
            </View>

          <Text>League Members</Text>
          <DataTable>
            <DataTable.Header title="League Members">
              <DataTable.Title>Standing</DataTable.Title>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Waiver</DataTable.Title>
            </DataTable.Header>
            {memberList()}

          </DataTable>
        </View>
      </React.Fragment>
      
    );

    
  }

export default function LeagueScreen({ route }) {
    const navigation = useNavigation();
    const params = route.params;
    const leagueDetails = params.leagueObj;
    const roster = leagueDetails.num_roster.roster;
    const rosterSpots = leagueDetails.num_roster.roster_spots;
    const benchSpots = leagueDetails.num_roster.bench;
    const benchRoster = leagueDetails.num_roster.bench_roster;
    const injuredReserveAvailable = leagueDetails.num_roster.injured_reserve.available;
    const injuredReserveSpots = leagueDetails.num_roster.injured_reserve.spots;
    const injuredReserveRoster = leagueDetails.num_roster.injured_reserve_roster;
    const taxiActive = leagueDetails.num_roster.taxi.available;
    const taxiSpots = leagueDetails.num_roster.taxi.spots;
    const taxiRoster = leagueDetails.num_roster.taxi_roster;
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
          // console.log(playerInfo);
          player.position = playerInfo.athlete.position?.displayName || null;
          player.positionAbbr = playerInfo.athlete.position?.abbreviation || null;
          player.teamAbbr = playerInfo.athlete.team?.abbreviation || null;
          player.teamName = playerInfo.athlete.team?.displayName || null;
          player.teamLogo = playerInfo.athlete.team?.logos[0].href || null;
          player.headshot = playerInfo.athlete.headshot?.href || playerInfo.athlete.team?.logos[0].href;

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
          <Tab.Screen name="Team" component={RosterScreen} 
          initialParams={{roster: roster, rosterSpots: rosterSpots, benchSpots: benchSpots, benchRoster: benchRoster, 
            injuredReserveAvailable: injuredReserveAvailable, injuredReserveSpots: injuredReserveSpots, 
            injuredReserveSpots: injuredReserveSpots, injuredReserveRoster: injuredReserveRoster, 
            taxiActive: taxiActive, taxiSpots: taxiSpots, taxiRoster
          }} />
          <Tab.Screen name="Matchup" component={MatchUpScreen} />
          <Tab.Screen name="Players" component={PlayersListScreen} initialParams={availablePlayers} options={{title: "Available Players"}}/> 
          <Tab.Screen name="My News" component={MyNewsScreen} />
          <Tab.Screen name="Analytics" component={AnalyticsScreen} />
      </Tab.Navigator>

    </View>
    </>
    
  );
}