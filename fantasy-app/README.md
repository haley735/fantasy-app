# fantasy-app
mvp for fantasy sports; starting out only supporting fantasy football

Notes: 

this does not current have a backend service attached to it. the application is using mock data to establish data objects. 

While developing, updates are being made to data objects as needed. A relational database will be the best option in order to keep track of players already on teams since teams are on a user by user basis. 

source for sport data api documentation: https://gist.github.com/nntrn/ee26cb2a0716de0947a0a4e9a157bc1c

each player has their own id from the sport data api, which belongs to a user with a specific id.
for easier sorting of who's available, keeping track of all taken players is the easiest solution to implement most likely. However, writing to that table will require knowing the current user's id to add player info to the user's list of players taken. This will typically be done upon drafting and then as needed when modifying teams during the regular season, but it'll likely be less frequent. 

UML provided below: 