import React, { Component } from "react";
import { Button, View, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';

export default function RosterScreen({route}) {
  const navigation = useNavigation();
  const roster = route.params;
  console.log('route: ', roster);
  function rosterList(){
    const rosterKeys = Object.keys(roster);
    return rosterKeys.map((key, index) => {
      return roster[key].map((entry, index) => {
          console.log(entry.player?.first_name);
            return (
                <DataTable.Row key={index}>
                    <DataTable.Cell>{key}</DataTable.Cell>
                    <DataTable.Cell>{entry.player ? entry.player?.first_name + ' ' + entry.player?.last_name : null}</DataTable.Cell>
                    <DataTable.Cell>{entry.player ? entry.player?.location + ' ' + entry.player?.team : null}</DataTable.Cell>
                </DataTable.Row>              
            );
            // <Text key={index}>{
            //   entry.player ? entry.player?.first_name + ' ' + entry.player?.last_name : 'Empty'
            //   }</Text>);
      });
    });
    // return roster.map((entry, index) => {
    //   entry.map((position, index) => {
    //     return <Text key={index}>{position}</Text>
    //   })
    // })
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Position</DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Team</DataTable.Title>
        </DataTable.Header>
        {rosterList()}

      </DataTable>
    </View>
  );
}