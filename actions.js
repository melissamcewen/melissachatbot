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

    switch (messageText) {
      case 'about':
        Messages.sendGreeting(senderID);
        break;
      case 'generic':
        Messages.sendGenericMessage(senderID);
        break;

      default:
        Messages.sendTextMessage(senderID, messageText);
    }
  } else if (messageAttachments) {
    Messages.sendTextMessage(senderID, "Oops, I'm just a baby bot, I don't know how to read pictures yet, I'll let you know when I can.");
  }
}

function receivedPostback(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfPostback = event.timestamp;

  // The 'payload' param is a developer-defined field which is set in a postback 
  // button for Structured Messages. 
  console.log("postback received");
  var payload = event.postback.payload;
  if (payload === "get_started"){
      Messages.sendGreeting(senderID);
  }
  if (payload === "work"){
  
    Messages.sendTextMessage(senderID, "I work a lot OK?");
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