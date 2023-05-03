import "react-native-gesture-handler";
import React from "react";
import { Button, View, Text, Modal, StyleSheet, Pressable} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from "react";
import { context } from "../App";
import { ScrollView, TextInput } from "react-native-web";
import { Card } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';


const SingleLeague = (props) =>{
    const id = props.id;
    const name = props.name;
    const sportType = props.sport_type;
    const leagueType = props.league_type;
    return(
        <View style={{flex: 1, alignItems: "center", justifyContent:"space-around"}}>
            <Text style={{fontFamily: 'Verdana', fontSize: "16pt"}}>{name}</Text>
            <Text style={{fontFamily: 'Verdana', fontSize: "12pt"}}>Sport: {sportType}</Text>
            <Text style={{fontFamily: 'Verdana', fontSize: "12pt"}}>Type: {leagueType}</Text>            
        </View>
    );

}


export default function LeagueListScreen() {
    const navigation = useNavigation();
    const userContext = useContext(context);
    const [leagues, setLeagues] = useState([]);
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [joinModalVisible, setJoinModalVisible] = useState(false);
    const [leagueTypeSelected, setLeagueTypeSelected] = useState("");
    const [leagueSizeSelected, setLeagueSizeSelected] = useState("");
    const [draftTypeselected, setDraftTypeSelected] = useState("");
    const [joinDraftTypeSelected, setJoinDraftTypeSelected] = useState("");
    const [joinLeagueTypeSelected, setJoinLeagueTypeSelected] = useState("");
    const leagueTypes = [{key: 1, value: 'redraft'}, {key:2, value: 'dynasty'}, {key:3, value: 'keeper'}];
    const draftTypes = [{key: 1, value: 'snake'}, {key:2, value: 'linear'}, {key:3, value: 'auction'}];

    let leagueSize = [];
    for(var i=4; i<=32; i+=2){
        leagueSize.push({key:i, value: i});
    }

    useEffect(() =>{
        setLeagues(userContext.user.leagues);
        navigation.setOptions({title: 'All Leagues'});
    });
    
    function leagueList() {
        return leagues.map((league, index) => {
            const key = `${league.league_type}-league-${index}`;
            return(
                <React.Fragment key={key}>
                    <View style={{flex: 1, justifyContent: "space-around", borderWidth: "5px", borderColor:"#cccccc"}}>
                        <SingleLeague 
                        id={league.id}
                        key={key.toString()}
                        name={league.name}
                        sport_type={league.sport_type}
                        league_type={league.league_type}
                        />
                        <Button
                        title="Details"
                        style={{fontFamily: 'Verdana', fontSize: "12pt"}}
                        onPress={() => navigation.navigate("League", {id: league.id, leagueObj: league})} />
                    </View>
                </React.Fragment>
            );
        });
    }
    
    
  return (
    <>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "space-between" }}>
            {/* create league modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={createModalVisible}
                onRequestClose={() => {
                setCreateModalVisible(!createModalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Create League</Text>
                        <Text>League Name: </Text>
                        <TextInput></TextInput>
                        <Text>Type</Text>
                        <SelectList 
                            setSelected={(val) => setLeagueTypeSelected(val)} 
                            data={leagueTypes} 
                            save="value"/>
                        <Text>League Size</Text>
                        <SelectList 
                            setSelected={(val) => setLeagueSizeSelected(val)} 
                            data={leagueSize} 
                            save="value"/>
                        <Text>Draft Type</Text>
                        <SelectList 
                            setSelected={(val) => setDraftTypeSelected(val)} 
                            data={draftTypes} 
                            save="value"/>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setCreateModalVisible(!createModalVisible)}>
                            <Text style={styles.textStyle}>Confirm</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setCreateModalVisible(!createModalVisible)}>
                            <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {/* join league modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={joinModalVisible}
                onRequestClose={() => {
                joinModalVisible(!joinModalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Join League</Text>
                        <Text>Type</Text>
                        <SelectList 
                            setSelected={(val) => setJoinLeagueTypeSelected(val)} 
                            data={leagueTypes} 
                            save="value"/>
                        <Text>Draft Type</Text>
                        <SelectList 
                            setSelected={(val) => setJoinDraftTypeSelected(val)} 
                            data={draftTypes} 
                            save="value"/>
                        <Text>Scoring Type</Text>
                        <Text>Lineup Type</Text>
                        <Text>Buy In</Text>
                        <Text>League List: </Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setJoinModalVisible(!joinModalVisible)}>
                            <Text style={styles.textStyle}>Confirm</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setJoinModalVisible(!joinModalVisible)}>
                            <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <View style={{flex: 1, alignItems: "center", justifyContent: "space-around", flexDirection: "row"}}>
                <Button style={{borderRadius: 20, padding: 10, elevation: 2}}
                    title="Create League"
                    onPress={() => setCreateModalVisible(true)} />
                <Button style={{borderRadius: 20, padding: 10, elevation: 2}}
                    title="Join League"
                    onPress={() => setJoinModalVisible(true)} /> 
            </View>
                           
        </View>

        { leagueList() }
            
    </>
    
  );
}

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