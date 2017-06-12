var builder = require('D:/Pre-sales/Banking Bot/account-linking-demo-bot/node_modules/botbuilder');
var restify = require('D:/Pre-sales/Banking Bot/account-linking-demo-bot/node_modules/restify');
const request = require('D:/Pre-sales/Banking Bot/account-linking-demo-bot/node_modules/request');


//=========================================================
// Bot Setup
//=========================================================
// Bot - NewNBrown

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 5201, function() {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
//it is for bot named "test"
var connector = new builder.ChatConnector({
 // appId: process.env.MICROSOFT_APP_ID,
 // appPassword: process.env.MICROSOFT_APP_PASSWORD
    appId: '546f5125-e731-4b69-88f3-0dc3aa5d169f',
  appPassword: 'QcayHDmU6GtwA2VkvXwxF6c'
});



var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());


//function to return entity

// const firstEntityValue = (entities, entity) => {
//     const val = entities && entities[entity] &&
//         Array.isArray(entities[entity]) &&
//         entities[entity].length > 0 &&
//         entities[entity][0].value;
//     if (!val) {
//         return null;
//     }
//     return typeof val === 'object' ? val.value : val;
// };


// bot.dialog('/', [
//     function (session, args, next) {
//         if (!session.userData.name) {
//             session.beginDialog('/profile');
//         } else {
//             next();
//         }
//     },
//     function (session, results) {
//         session.send('Hello %s!', session.userData.name);
//     }
// ]);


//bot.use(Middleware.dialogVersion({version: 1.0, resetCommand: /^reset/i}));
//activity.GetStateClient().BotState.DeleteStateForUser(activity.ChannelId, activity.From.Id);

bot.endConversationAction('goodbye', 'Goodbye :)', { matches: /^goodbye/i });


bot.dialog('/', [
    function(session) {
        name = session.message.user.name
        //console.log(name)
        var url = 'http://34.199.171.154:5000/parse?q='
        var q = session.message.text
        var intentV
        var intentN
        var modifiedq = q.replace(/ /g, "+")
        var modifiedurl = url.concat(modifiedq).concat('&token=12345')
        request(modifiedurl, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                //console.log(body)
                var obj = JSON.parse(body);
                //console.log("First")
                //console.log(obj)
                // getting the intent
              //  console.log(obj.entities)
console.log("Value of Private conversation data : @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
console.log(session.privateConversationData)
console.log("Message from user : >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
console.log(session.message.text)
console.log(obj)
console.log("name of intent with highest score")
var MaxConName = obj.intent.name
console.log(obj.intent.name)
console.log(obj.intent_ranking)
for(var i = 0; i < obj.intent_ranking.length; i++) {
    var obj1 = obj.intent_ranking[i];
    if(obj1.name == MaxConName)
    {
      console.log("Name matched with max confidence")
      //session.send("LOL")
      //session.endConversation()
      session.send(obj1.response)

    }


    console.log("Outside loop");
    console.log(obj.intent_ranking[i].name)
}
                    //  console.log(obj.entities.intent[0].value)

}
});
}
]);
