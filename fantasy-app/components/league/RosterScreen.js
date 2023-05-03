import React, { Component } from "react";
import { Button, View, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';
import { ScrollView } from "react-native-web";

export default function RosterScreen({route}) {
  const navigation = useNavigation();
  const roster = route.params;
  function rosterList(){
    const rosterKeys = Object.keys(roster);
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
    </View>
    </ScrollView>
    
  );
}