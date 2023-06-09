import React, { Component, useState } from "react";
import { Button, View, Text, StyleSheet, Modal, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';
import { ScrollView } from "react-native-web";

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

export default function RosterScreen({route}) {
  const navigation = useNavigation();
  const roster = route.params.roster;
  const rosterSpots = route.params.rosterSpots;
  const benchSpots = route.params.benchSpots;
  const benchRoster = route.params.benchRoster;
  const injuredReserveAvailable = route.params.injuredReserveAvailable;
  const injuredReserveSpots = route.params.injuredReserveSpots;
  const injuredReserveRoster = route.params.injuredReserveRoster;
  const taxiActive = route.params.taxiActive;
  const taxiSpots = route.params.taxiSpots;
  const taxiRoster = route.params.taxiRoster;
  const [tradeModalVisible, setTradeModalVisible] = useState(false);


  function rosterList(){
    const rosterKeys = roster ? Object.keys(roster) : null;
    if(rosterKeys){
      return rosterKeys.map((key, index) => {
        return roster[key].map((entry, index) => {
              return (
                  <DataTable.Row key={index}>
                      <DataTable.Cell>{key}</DataTable.Cell>
                      <DataTable.Cell>{entry.player ? entry.player?.first_name + ' ' + entry.player?.last_name : null}</DataTable.Cell>
                      <DataTable.Cell>{entry.player ? entry.player?.location + ' ' + entry.player?.team : null}</DataTable.Cell>
                  </DataTable.Row>              
              );
        });
      });
    }
    else{
      for(var i=0; i<rosterSpots; i++){
        return (
          <DataTable.Row key={i}>
            <DataTable.Cell>{null}</DataTable.Cell>
            <DataTable.Cell>{null}</DataTable.Cell>
            <DataTable.Cell>{null}</DataTable.Cell>
          </DataTable.Row> 
        ); 
      }
    }
    
  }

  function benchList(){
    const benchRosterKeys = benchRoster ? Object.keys(benchRoster) : null;
    for(var i=0; i<benchSpots; i++){
      if(benchRosterKeys){
        return benchRosterKeys.map((key, index) => {
          return benchRoster[key].map((entry, index) => {
          return (
              <DataTable.Row key={index}>
                  <DataTable.Cell>{key}</DataTable.Cell>
                  <DataTable.Cell>{entry.player ? entry.player?.first_name + ' ' + entry.player?.last_name : null}</DataTable.Cell>
                  <DataTable.Cell>{entry.player ? entry.player?.location + ' ' + entry.player?.team : null}</DataTable.Cell>
              </DataTable.Row>              
            );
          });
        });
      }
      else{
        for(var i=0; i<benchSpots; i++){
          return (
            <DataTable.Row key={i}>
              <DataTable.Cell>{null}</DataTable.Cell>
              <DataTable.Cell>{null}</DataTable.Cell>
              <DataTable.Cell>{null}</DataTable.Cell>
            </DataTable.Row> 
          ); 
        }
      }
      
    }
  }

  function injuredReserveList(){
    const injuredReserveKeys = injuredReserveRoster ? Object.keys(injuredReserveRoster) : null;
    for(var i=0; i<injuredReserveSpots; i++){
      if(injuredReserveKeys){
        return injuredReserveKeys.map((key, index) => {
          return injuredReserveRoster[key].map((entry, index) => {
          return (
              <DataTable.Row key={index}>
                  <DataTable.Cell>{key}</DataTable.Cell>
                  <DataTable.Cell>{entry.player ? entry.player?.first_name + ' ' + entry.player?.last_name : null}</DataTable.Cell>
                  <DataTable.Cell>{entry.player ? entry.player?.location + ' ' + entry.player?.team : null}</DataTable.Cell>
              </DataTable.Row>              
            );
          });
        });
      }
      else{
        for(var i=0; i<injuredReserveSpots; i++){
          return (
            <DataTable.Row key={i}>
              <DataTable.Cell>{null}</DataTable.Cell>
              <DataTable.Cell>{null}</DataTable.Cell>
              <DataTable.Cell>{null}</DataTable.Cell>
            </DataTable.Row> 
          ); 
        }
      }
      
    }
  }

  function taxiList(){
    const taxiRosterKeys = taxiRoster ? Object.keys(taxiRoster) : null;
    for(var i=0; i<taxiSpots; i++){
      if(taxiRosterKeys){
        return taxiRosterKeys.map((key, index) => {
          return taxiRoster[key].map((entry, index) => {
          return (
              <DataTable.Row key={index}>
                  <DataTable.Cell>{key}</DataTable.Cell>
                  <DataTable.Cell>{entry.player ? entry.player?.first_name + ' ' + entry.player?.last_name : null}</DataTable.Cell>
                  <DataTable.Cell>{entry.player ? entry.player?.location + ' ' + entry.player?.team : null}</DataTable.Cell>
              </DataTable.Row>              
            );
          });
        });
      }
      else{
        for(var i=0; i<taxiSpots; i++){
          return (
            <DataTable.Row key={i}>
              <DataTable.Cell>{null}</DataTable.Cell>
              <DataTable.Cell>{null}</DataTable.Cell>
              <DataTable.Cell>{null}</DataTable.Cell>
            </DataTable.Row> 
          ); 
        }
      }
      
    }
  }

  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View id="roster" style={{ flexGrow: 1, alignItems: "center", justifyContent: "space-between" }}>
            {/* trade modal */}
              <Modal
                animationType="slide"
                transparent={true}
                visible={tradeModalVisible}
                onRequestClose={() => {
                setTradeModalVisible(!tradeModalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Make a Trade</Text>
                        {/* */}
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setTradeModalVisible(!tradeModalVisible)}>
                            <Text style={styles.textStyle}>Confirm</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setTradeModalVisible(!tradeModalVisible)}>
                            <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <View style={{flexGrow: 0, flexShrink: 1, alignItems:"baseline", justifyContent: "space-around", flexDirection: "row"}}>
                <Button style={{borderRadius: 20, padding: 10, elevation: 2}}
                    title="Trade"
                    onPress={() => setTradeModalVisible(true)} />
                <Button style={{borderRadius: 20, padding: 10, elevation: 2}}
                    title="Add Players"
                    onPress={() => navigation.navigate("Players")} /> 
            </View>
      </View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Position</DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Team</DataTable.Title>
        </DataTable.Header>
        {rosterList()}

      </DataTable>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "space-between" }}>

        <Text>Bench</Text>
        </View>
        <DataTable>
          <DataTable.Header title="Bench">
            <DataTable.Title>Position</DataTable.Title>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>Team</DataTable.Title>
          </DataTable.Header>
          {benchList()}

        </DataTable>
      {/* </View> */}
      {injuredReserveAvailable && 
      (
        <>
          <Text>Injured Reserve</Text>
          <DataTable>
            <DataTable.Header title="Injured Reserve">
              <DataTable.Title>Position</DataTable.Title>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Team</DataTable.Title>
            </DataTable.Header>
            {injuredReserveList()}

          </DataTable>
        </>
      )
        
      }
      {taxiActive &&
        (<>
          <Text>Taxi</Text>
          <DataTable>
          <DataTable.Header title="Taxi">
            <DataTable.Title>Position</DataTable.Title>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>Team</DataTable.Title>
          </DataTable.Header>
          {taxiList()}

        </DataTable>
        </>
        
      )}
      
    </View>
    </ScrollView>
    
  );
}