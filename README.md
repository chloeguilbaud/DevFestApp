# DevFestApp
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

## TODO
Gestion du mode déconnecté
Gestion des erreurs
Balise HTML
PAs de photo sur note page en browser

## Handling errors
Connexion, picture taking, database acces,... many errors can happen and they have to be indicated to the user. A specific manager has been dedicated to that task and iq located in the `error.handler` package. The error managers enable specific process (`query.error.handler`: , `error.alert.handler`: basic error alert).
This choise enbles seperate and dedicated traitement.

## Structure and architecture

### Online query

Providers have been set to enable http queries. They provide needed methods that the model will be able to directly call without having to care about the actual implementation.

Beetween the provider and the model relies a manager in charge of ensuring good comunication beetween those two elements. Requiring and provideing adapted and parsed data. The provider provides data, the manager parses and gives a representative object containing the required data then given to the view controller. This enables seperated traitement.

Alert if internet not available

### Database query

Architecture has been built and thaugh in order to enable independent modules. With that, if needed, one module can be changed without impacting the other ones or the model.

Indeed, when needed the view controller can require or save data in the data base through the dedicated manager `db.manager`.

This conception enables independ processes. At some point in this project we had complication regarding the database techinical choises. We first wanted to work with sqlite. It has been implemented in the manager and the controlerr could access data witout having to care about how the manager would get it. We then decided to use IndexDB. We just had to change the database module implementation and no need to make any update in the controller. 

All this project has been organised in indepent module alowing updates without any inpact at all on the other modules.
