const Messages = require('./messages');
const request = require('request');

function receivedMessage(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;
  
  

  console.log("Received message for user %d and page %d at %d with message:", 
    senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));


  var messageId = message.mid;

  var messageText = message.text;
  var messageAttachments = message.attachments;


if (messageText) {
    // If we receive a text message, check to see if it matches a keyword
    // and send back the template example. Otherwise, just echo the text we received.
   if(messageText.includes('about')){
      Messages.sendTextMessage(senderID, "about");
   } else if (messageText.includes('meow')) {
    Messages.sendTextMessage(senderID, "meow");

   } else {
     Messages.sendTextMessage(senderID, "I'm confused");

   }
  } else if (messageAttachments) {
    Messages.sendTextMessage(senderID, "Oops, I'm just a baby bot, I don't know how to read pictures yet, I'll let you know when I can.");
  }
}

function receivedPostback(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfPostback = event.timestamp;
  console.log("postback received");
  var payload = event.postback.payload;
  if (payload === "get_started"){
     var messageText= "Oh hello! Sorry I didn't notice you, I've been reading this wonderful book. It's my favorite part because—you'll see Here's where she meets Prince Charming But she won't discover that it's him 'til Chapter Three!";
      var buttons = [
          {
            type:"postback",
            payload:"likes",
            title:"Your likes"
          },
          {
            type:"postback",
            payload: "life",
            title: "Your life"
          }
        
        ];
      Messages.sendButtons(senderID, messageText, buttons);
  }
  if (payload === "likes"){
    var messageText = "In this little village there isn't much, Père Robert's bookstore is just about my favorite place to go."
    var buttons = [
        {
          type:"postback",
          payload:"books",
          title:"your favorite books?"
        },
        {
          type:"postback",
          payload: "go",
          title: "Where do you want to go?"
        }

      ];
    
    Messages.sendButtons(senderID, messageText, buttons);

  }

  console.log("Received postback for user %d and page %d with payload '%s' " + 
    "at %d", senderID, recipientID, payload, timeOfPostback);

  // When a postback is called, we'll send a message back to the sender to 
  // let them know it was successful
  //sendTextMessage(senderID, "Postback called");
}



module.exports = {
   receivedPostback,
   receivedMessage
}