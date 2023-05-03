import React, { useEffect } from "react";
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { context } from "../App";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default function HomeScreen({ route }) {
  const navigation = useNavigation();
  const welcomeString = route.params.username.charAt(0).toUpperCase() + route.params.username.slice(1);
  useEffect(() =>{
    navigation.setOptions({title: `Hello, ${welcomeString}!`})
  }, []);
  console.log(route.params);
  
  return (
    <>
     <SafeAreaView style={styles.container}>
      <View>
        <Text>Home Screen</Text>
        <Text>General feed of all fantasy news from The Athletic</Text>
        <Button
          title="Go to Leagues"
          onPress={() => navigation.navigate("Leagues", {})} />
          </View>
     </SafeAreaView>
    
      </>
  );

  
}