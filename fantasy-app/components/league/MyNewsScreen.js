import React, { Component } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';

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

export default function MyNewsScreen({route}) {
  const navigation = useNavigation();

  return (
    <>
      {console.log('in my news')}
      <SafeAreaView style={styles.container}>
        <View >
          <Text>My News Screen</Text>
      </View>
      </SafeAreaView>
    
    </>
    
  );
}