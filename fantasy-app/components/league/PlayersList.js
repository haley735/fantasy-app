import React, { Component, useEffect, useState } from "react";
import { Button, View, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-paper';
import leagueData from '../LEAGUE_MOCK_DATA.json';
import playersTakenData from '../PLAYERS_TAKEN_MOCK_DATA.json';

export default function PlayersListScreen({route}) {
  const navigation = useNavigation();
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  useEffect(() => {
    async function  getFilteredPlayers() {
      const playersTaken = playersTakenData.data;
      let playersNames = [];
      Object.keys(playersTaken).forEach((key) => {
        playersNames.push(`${playersTaken[key].player.first_name} ${playersTaken[key].player.last_name}`);
      });
    
      const res = await fetch('https://sports.core.api.espn.com/v3/sports/football/nfl/athletes?limit=18000');
      const players = await res.json();

      const filtered = players.items.filter((player) => {
          return player.active === true && 
          !playersNames.includes(player.fullName);
      });
    
      setFilteredPlayers(filtered);
      return filtered;
    }

    getFilteredPlayers();
  }, []);

  console.log(filteredPlayers);
  
  return (
    <>
      <View style={{ flex: 1, }} >
        {/* <Text>Players Screen</Text> */}
        <Card>
          <Card.Title title="Card Title" subtitle="Card Subtitle" />
          <Card.Content>
            <Text variant="titleLarge">Card title</Text>
            <Text variant="bodyMedium">Card content</Text>
          </Card.Content>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
          </Card.Actions>
        </Card>
      </View>
    </>
    
  );
}