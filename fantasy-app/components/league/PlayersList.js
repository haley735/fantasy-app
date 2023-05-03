import React, { useEffect, useState } from "react";
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


const SinglePlayerScreen = (props) => {
  const playerInfo = props.playerInfo[0];

  const handleOnPress = () =>{
    playerInfo.callBack.showList(true);
  }

  return (
    <ScrollView>
      <Card>
          <Card.Title title={playerInfo.name} subtitle={playerInfo.teamDisplayName} />
          <Card.Content>
            <Text variant="bodyMedium">{'Position: ' + playerInfo.positionDisplayName}</Text>
            <Text variant="bodyMedium">{'Age: ' + playerInfo.age}</Text>
            <Text variant="bodyMedium">{'Height: ' + playerInfo.height}</Text>
            <Text variant="bodyMedium">{'Weight: ' + playerInfo.weight}</Text>
            <Text variant="bodyMedium">{'Experience: ' + playerInfo.experience}</Text>
          </Card.Content>
          <Card.Cover source={{ uri: playerInfo.photo }} />
          <Card.Actions style={{flex: 1, alignSelf: "center" , justifyContent: "space-around", flexDirection: "row"}}>
            <Text>
              <Button 
                title= "Add Player"
              />
            </Text>
            
            <Text>
            <Button 
              title="Back"
              onPress={handleOnPress}/>
            </Text>
            
          </Card.Actions>
      </Card>
      <Card>
        <Card.Title title="News" subtitle="News relvant for the player" />
        <Card.Content>
          <Text>
            News Article
          </Text>
        </Card.Content>

      </Card>
      <Card>
        <Card.Title title="Player History & Analytics" subtitle="Fantasy history & Analytics relvant for the player" />
        <Card.Content>
          <Text>
            visual
          </Text>
        </Card.Content>

      </Card>

    </ScrollView>
    
  )
}

const PlayersListCards = (props) => {
  const handleOnPress = () => {
    props.callBack.showList(false);
    props.callBack.singlePlayerInfo([props]);
  }

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
          <Card.Actions style={{flex: 1, alignSelf: "center" , justifyContent: "space-around", flexDirection: "row"}}>
            <Text>
              <Button 
                title= "+"
              />
            </Text>
            
            <Text>
            <Button 
              title="More Info"
              onPress={handleOnPress}/>
            </Text>
            
          </Card.Actions>
      </Card>
  );
};

export default function PlayersListScreen({ route }) {
  const allPositions = ['WR', 'RB', 'TE', 'QB', 'FLEX', 'K', 'DEF'];
  const [showList, setShowList] = useState(true);
  const [singlePlayerInfo, setSinglePlayerInfo] = useState([]);
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
          callBack={{showList: setShowList, singlePlayerInfo: setSinglePlayerInfo}}
        />
      );
    })
    }

  function filterPills(){
    return positionsVarGrouped.map((group, index) => {
      let position = group[0];
      let positionVar = group[1];
      return (
        <Pressable
          key={index}
          style={positionVar ? [styles.button, styles.buttonOpen] : [styles.button, styles.buttonClose]}
          onPress={() => {
            handlePositionSelection(position, positionVar);
            
          }}>
          <Text style={styles.textStyle}>{position}</Text>
      </Pressable>
      );      
    })
  }
    
  return (
    <>
    {showList ? 
      <ScrollView style={{ flex: 1, }} >
        <View style={{flex: 1, justifyContent: "space-around", flexDirection:"row"}}>
          {filterPills()}
      </View>
        <Text>
          {availablePlayerCards()}  
        </Text>
      </ScrollView>
    : <SinglePlayerScreen playerInfo={singlePlayerInfo}/>} 
    </>
    

  );
}