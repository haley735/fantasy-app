# fantasy-app
mvp for fantasy sports; starting out only supporting fantasy football

### Installation + Running & Notes 

To run the application, install node packages, and make sure expo cli is installed as well. From there, you can run in a terminal window, `npx expo start` and choose your form of deployment whether that be web (recommended), iOS, or Android.

This application does not currently have a backend service attached to it. The application is using mock data from JSON files to establish data objects. The JSON files are provided to run locally on a web version. The application will not work on mobile until a backend service is connected or some other type of storage soluation, maybe AsyncStorage if not worried about security just yet. 

While developing, updates are being made to data objects as needed. A relational database will be the best option in order to keep track of players already on teams since teams are on a user by user basis. 

### Sports API 

source for sport data api documentation: https://gist.github.com/nntrn/ee26cb2a0716de0947a0a4e9a157bc1c

I had trouble getting all of the active NFL players from the api followed by another api call per active player. I saved all of the active NFL players from the api to a JSON to then be filtered accordingly by league and then by available player depending upon the user logged in. 

Each player has their own id from the sport data api, which belongs to a user with a specific id.
For easier sorting of who's available, keeping track of all taken players is the easiest solution to implement (most likely). However, writing to that table will require knowing the current user's id to add player info to the user's list of players taken. This will typically be done upon drafting and then as needed when modifying teams during the regular season, but it'll likely be less frequent. 

### Object Structures
For a full example, look for any files marked with `MOCK_DATA.json`. Additional restrictions around certain data types and accepted entries will be necessary and objects will most likely need to be modified to accomodate additional validation. 

#### user
When adding users to lists, the below structure is necessary and can be exanded upon
```
{
  "id": 1,
  "first_name": "Haley",
  "last_name": "Pieratt",
  "leagues": []
}
```

#### leagues
When adding leagues to lists for the respectice user, the below structure is the minimum necssary and can be expanded upon. This object is added to a user upon creating or joining a league. 
```
{
  "id": 1,
  "name": "League 1",
  "sport_type": "football",
  "league_type": "dynasty", 
  "commissioner": true, 
  "num_league_members": 10,
  "num_roster": {
      "roster_spots": 11,
      "main": {
          "QB": 2,
          "WR": 2,
          "RB": 2,
          "TE": 1,
          "FLX": 2,
          "SFLX": false,
          "Kicker": true, 
          "Defense": true
      },
      "bench": 14,
      "injured_reserve": {
          "available": true,
          "spots": 2
      },
      "taxi": {
          "available": true, 
          "spots": 2
      },
      "roster":{},
      "bench_roster":[],
      "injured_reserve_roser":[],
      "taxi_roster": []
}
```

#### roster position
 When adding roster positions to lists for the respective user, the below structure is the minimum necessary and can be expanded upon. This object is added upon creating or joining a league.  
 ```
 "QB": [],
 "RB": []
 ```

#### player
When adding players to lists for the respective user, the below structure is the minimum necessary and can be expanded upon. This object is added upon drafting or updating roster throughout the season. 
```
{
  "id": 5,
  "player": {
      "first_name": "Stefon",
      "last_name": "Diggs",
      "team": "Bills",
      "location": "Buffalo"
  }
}
```
### MOCK DATA Files
##### USER_MOCK_DATA.json
- data file that contains an entire user object
- will contain full league objects; can be changed to references
##### LEAGUE_MOCK_DATA.json
- data file that contians an entire single league object
- will contain full league object including a list of all members
##### PLAYERS_TAKEN_MOCK_DATA.json
- data file that contians players taken from a single league 
- used to keep track of players that are not available to pickup & provide filtering for the players screen
- updated on draft and throughout the season
##### ACTIVE_NFL_PLAYERS.json
- data file that contians all active nfl players
- only necessary for faster/easier filtering 
- doesn't need to be updated much
- a single large data store as the source of truth
