import React, { Component } from "react";
import { Button, View, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function PlayersListScreen({route}) {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Players Screen</Text>
    </View>
  );
}