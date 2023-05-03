# fantasy-app
mvp for fantasy sports; starting out only supporting fantasy football

Notes: 

To run the application, install node packages, and make sure expo cli is installed as well. From there, you can run in a terminal window, npx expo start and choose your form of 

This application does not currently have a backend service attached to it. The application is using mock data from JSON files to establish data objects. The JSON files are provided to run locally on a web version. The application will not work on mobile until a backend service is connected or some other type of storage soluation, maybe AsyncStorage if not worried about security just yet. 

While developing, updates are being made to data objects as needed. A relational database will be the best option in order to keep track of players already on teams since teams are on a user by user basis. 

source for sport data api documentation: https://gist.github.com/nntrn/ee26cb2a0716de0947a0a4e9a157bc1c

I had trouble getting all of the active NFL players from the api followed by another api call per active player. I saved all of the active NFL players from the api to a JSON to then be filtered accordingly by league and then by available player depending upon the user logged in. 

Each player has their own id from the sport data api, which belongs to a user with a specific id.
For easier sorting of who's available, keeping track of all taken players is the easiest solution to implement (most likely). However, writing to that table will require knowing the current user's id to add player info to the user's list of players taken. This will typically be done upon drafting and then as needed when modifying teams during the regular season, but it'll likely be less frequent. 

UML provided below: 