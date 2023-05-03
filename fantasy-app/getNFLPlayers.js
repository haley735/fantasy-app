fs = require('fs');

async function getPlayers(){
    const res = await fetch('https://sports.core.api.espn.com/v3/sports/football/nfl/athletes?limit=18000&active=true');
    const players = await res.json();
    fs.writeFile('ACTIVE_NFL_PLAYERS.JSON', JSON.stringify(players), function(err, result) {
        if(err) console.log('error', err);
    });
    console.log(players);
    return players;
}
getPlayers();