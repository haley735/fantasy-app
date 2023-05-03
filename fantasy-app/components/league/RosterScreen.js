import React, { Component } from "react";
import { Button, View, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';
import { ScrollView } from "react-native-web";

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