# DevFest App
Mael MAINCHAIN & Chloe GUILBAUD

## Build for dev
`npm install`

## Build Android
`ionic cordova build android`

## Emulate Android or run on device
`ionic cordova run android`
`abd install -r apk`

## Run Ionic Project
`ionic serve`

## Disconnected mode

A Service Worker enables auto saving in the cache at first request. It can then be refreshed by the user through the 'Refresh' page. If
internet is enabled the cache is emptied and automatically saved again. If not the user is advertised.

## Structure and architecture

## Handling errors

Connexion, picture taking, database access,... many errors can occur and they have to be indicated to the user. 
A specific manager has been dedicated to that task and is located in the `error.handler` package. 
The error managers enables specific process (`query.error.handler`: , `error.alert.handler`: basic error alert).
This choose enables separate and dedicated process.

### Online query

Providers have been set to enable http queries. They provide needed methods so that the model can directly request the server
without having to care about the actual implementation and protocol access.

Between the provider and the model their is a manager in charge of ensuring good communication between those two elements. 
The provider provides data, the manager parses and gives a representative
 object containing the required data which is then given to the view controller. This enables separated treatment.
 The manager is in charge of requiring and providing adapted and parsed data. 

An alert is displayed if internet is not available.

### Database query

Architecture has been built and thought in order to enable independent modules. Thanks to this, if needed, one module can be changed 
without impacting the other ones or the model.

Indeed, when needed the view controller can require or save data in the data base through the dedicated manager `db.manager`. This conception enables independent processes. 

At some point in this project we had complication regarding the database technical choices. 
We first wanted to work with SQLite. It has been implemented in the manager. The controller could then access data
 without having to care about how the manager would get it. 
 We then decided to use IndexDB instead and test if this architecture would enable easy technical change. 
 And it did, we just had to change the database module implementation and no need to make any update in the controller. 

All this project has been organised in independent modules allowing updates without any impact at all on the other modules.


