import React, { Component, useEffect, useState, useCallback, useMemo } from "react";
import { Button, View, Text, ActivityIndicator, Pressable, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-paper';
import { ScrollView } from "react-native-web";

const styles = StyleSheet.create({
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
});

const PlayersListCards = (props) => {
  return (
    <Card>
          <Card.Title title={props.name} subtitle={props.teamDisplayName} />
          <Card.Content>
            <Text variant="bodyMedium">{'Position: ' + props.positionDisplayName}</Text>
            <Text variant="bodyMedium">{'Age: ' + props.age}</Text>
            <Text variant="bodyMedium">{'Height: ' + props.height}</Text>
            <Text variant="bodyMedium">{'Weight: ' + props.weight}</Text>
            <Text variant="bodyMedium">{'Experience: ' + props.experience}</Text>
          </Card.Content>
          <Card.Cover source={{ uri: props.photo }} />
          <Card.Actions>
            <Button>More Info</Button>
          </Card.Actions>
      </Card>
  );
};

export default function PlayersListScreen({ route }) {
  const navigation = useNavigation();
  navigation.setOptions({title: 'Available Players'});
  const allPositions = ['WR', 'RB', 'TE', 'QB', 'FLEX', 'K', 'DEF'];
  const [availablePlayers, setAvailablePlayers] = useState(route.params);
  const [availablePlayersList, setAvailablePlayersList] = useState([]);
  const [playersToView, setPlayersToView] = useState([availablePlayersList]);
  const [isLoading, setIsLoading] = useState(true);
  let positionsList = ['WR', 'RB', 'TE', 'QB', 'FLEX', 'K', 'DEF'];
  let [positionsSelected, setPositionsSelected] = useState([]);
  const [WR, setWR] = useState(false);
  const [RB, setRB] = useState(false);
  const [TE, setTE] = useState(false);
  const [QB, setQB] = useState(false);
  const [FLEX, setFLEX] = useState(false);
  const [DEF, setDEF] = useState(false);
  const [K, setK] = useState(false);
  const positionsVarGrouped = [['WR', WR], ['RB', RB], ['TE', TE], ['QB', QB], ['FLEX', FLEX], ['K', K], ['DEF', DEF]];

  useEffect(() => {
    const playersList = [];
    Object.keys(availablePlayers).forEach((key) => {
      playersList.push(availablePlayers[key]);  
    });
    setAvailablePlayersList(playersList);
    setPlayersToView(playersList);
    setIsLoading(false);
    return () => {
      console.log('end of use effect');
      setIsLoading(false);
    }

  }, [availablePlayersList.length]);

  while(isLoading){
    return <ActivityIndicator/> 
  }

  const handlePositionSelection = (position, positionVar) => {
    console.log('entered handlePositionSelection');
    switch(position){
      case 'WR': setWR(!positionVar);
      if(!positionVar){
        positionsSelected.push('WR');
      }
      else{
          let index = positionsSelected.indexOf('WR');
          if(index === 0){
            // remove first element in array
            positionsSelected.shift();
          }
          else{
            positionsSelected.splice(index, 1);
          }
      }
      break;
      case 'RB': setRB(!positionVar);
      if(!positionVar){
        positionsSelected.push('RB');
      }
      else{
        let index = positionsSelected.indexOf('RB');
        if(index === 0){
          // remove first element in array
          positionsSelected.shift();
        }
        else{
          positionsSelected.splice(index, 1);
        }
      }
      break;
      case 'TE': setTE(!positionVar);
      if(!positionVar){
        positionsSelected.push('TE');
      }
      else{
          let index = positionsSelected.indexOf('TE');
          if(index === 0){
            // remove first element in array
            positionsSelected.shift();
          }
          else{
            positionsSelected.splice(index, 1);
          }
      }
      break;
      case 'QB': setQB(!positionVar);
      if(!positionVar){
        positionsSelected.push('QB');
      }
      else{
          let index = positionsSelected.indexOf('QB');
          if(index === 0){
            // remove first element in array
            positionsSelected.shift();
          }
          else{
            positionsSelected.splice(index, 1);
          }
      }
      break;
      case 'FLEX': setFLEX(!positionVar);
      if(!positionVar){
        positionsSelected.push('WR', 'RB', 'TE');
      }
      else{
          ['WR', 'RB', 'TE'].forEach((position) => {
            let index = positionsSelected.indexOf(position);
            if(index !== -1){
              if(index === 0){
                // remove first element in array
                positionsSelected.shift();
              }
              else{
                positionsSelected.splice(index, 1);
              }
            }
          })
          
      }
      break;
      case 'K': setK(!positionVar);
      if(!positionVar){
        positionsSelected.push('K');
      }
      else{
          let index = positionsSelected.indexOf('K');
          if(index === 0){
            // remove first element in array
            positionsSelected.shift();
          }
          else{
            positionsSelected.splice(index, 1);
          }
      }
      break;
      case 'DEF': setDEF(!positionVar);
      if(!positionVar){
        positionsSelected.push('DEF');
      }
      else{
          let index = positionsSelected.indexOf('DEF');
          if(index === 0){
            // remove first element in array
            positionsSelected.shift();
          }
          else{
            positionsSelected.splice(index, 1);
          }
      }
      break;
    }
    if(positionsSelected.length > 0){
      positionsList = resetPositionsList();
      positionsList = positionsList.filter((position) => positionsSelected.includes(position));
      setPlayersToView(availablePlayersList.filter((player)=> {
        return positionsList.includes(player.positionAbbr)
      }));
    }
    else{
      positionsList = resetPositionsList();
      positionsSelected = resetSelectedPositions();
      setPlayersToView(availablePlayersList.filter((player)=> {
        return positionsList.includes(player.positionAbbr)
      }));
    }
    console.log('handled press: ', positionsSelected, positionsList);

  }

  function resetPositionsList(){
    positionsList = allPositions;
    return positionsList;
  }

  function resetSelectedPositions(){
    positionsSelected = [];
    return positionsSelected;
  }

  function availablePlayerCards(){
    return playersToView.map((player) => {
      const yearsExperience = player.experience?.years ? `${player.experience?.years} years` : '0 years';
      return (
          <PlayersListCards 
          key={player.id}
          name={player.fullName}
          positionAbbr={player.positionAbbr}
          positionDisplayName={player.position}
          teamAbbr={player.teamAbbr}
          teamDisplayName={player.teamName}
          age={player.age}
          height={player.displayHeight}
          weight={player.displayWeight}
          experience={yearsExperience}
          photo={player.headshot}
        />
      );
    })
    }

  function filterPills(){
    return positionsVarGrouped.map((group) => {
      let position = group[0];
      let positionVar = group[1];
      console.log('position var: ', position, positionVar, typeof(positionVar));
      return (
        <Pressable
          style={positionVar ? [styles.button, styles.buttonOpen] : [styles.button, styles.buttonClose]}
          onPress={() => {
            console.log('inside pressable', positionVar);
            handlePositionSelection(position, positionVar);
            
          }}>
          <Text style={styles.textStyle}>{position}</Text>
      </Pressable>
      );      
    })
  }
    
  return (
    <ScrollView style={{ flex: 1, }} >
      <View style={{flex: 1, justifyContent: "space-around", flexDirection:"row"}}>
        {filterPills()}
    </View>
      <Text>
        {availablePlayerCards()}  
      </Text>
    </ScrollView>

  );
}