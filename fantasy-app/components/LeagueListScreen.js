import "react-native-gesture-handler";
import React from "react";
import { Button, View, Text} from "react-native";
import { useNavigation } from '@react-navigation/native';


import { useContext, useEffect, useState } from "react";
import { context } from "../App";

const SingleLeague = (props) =>{
    const id = props.id;
    const name = props.name;
    const sportType = props.sport_type;
    const leagueType = props.league_type;
    return(
        <View style={{flex: 1, alignItems: "center", justifyContent: "left"}}>
            <Text>{name}</Text>
            <Text>{sportType}</Text>
            <Text>{leagueType}</Text>
        </View>
    );

}


export default function LeagueListScreen() {
    const navigation = useNavigation();
    const userContext = useContext(context);
    const [leagues, setLeagues] = useState([]);

    useEffect(() =>{
        setLeagues(userContext.user.leagues);
        navigation.setOptions({title: 'All Leagues'});
    });
    
    function leagueList() {
        return leagues.map((league, index) => {
            const key = `${league.league_type}-league-${index}`;
            return(
                <React.Fragment key={key}>
                    <SingleLeague 
                    id={league.id}
                    key={key.toString()}
                    name={league.name}
                    sport_type={league.sport_type}
                    league_type={league.league_type}
                    />
                    <Button
                    title="Details"
                    onPress={() => navigation.navigate("League", {id: league.id, leagueObj: league})} />
                </React.Fragment>
                
            );
        });
    }
    
    
  return (
    <>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Button
            title="Create League"
            onPress={() => navigation.navigate("League", {id: '1'})} />
            <Button
            title="Join League"
            onPress={() => navigation.navigate("League", {id: '1'})} />
        </View>

        { leagueList() }
            
    </>
    
  );
}