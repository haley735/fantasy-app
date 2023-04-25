import React, { Component } from "react";
import { Button, View, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function LeagueDetailsScreen({route}) {
  const navigation = useNavigation();
  console.log('route: ', route);
  console.log(navigation.getParent());

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>League Details Screen</Text>
    </View>
  );
}