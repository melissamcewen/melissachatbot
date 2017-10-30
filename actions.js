var Messages = require('./messages');
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
        Messages.sendTextMessage(senderID, "about curly girl");
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
      Messages.sendTextMessage(senderID, "Welcome, as a baby \uD83D\uDC76 bot \uD83E\uDD16 right now all I can really do is read ingredients. Would you like to send me some? I'll take a look.");
  }
  if (payload === "about_curly_girl"){
    var introMessage = "The curly girl method is a way of caring for your naturally curly or wavy hair that helps it look its best."
    + "A important principle is hair should be gently washed without sulfates using a sulfate-free shampoo or conditioner cowash."
    + "But that also means that you need to avoid most silicones and waxes, which build up on the hair and require sulfates to remove."
    + "I can help you find what products have the right ingredients, just send me ingredient lists and I'll do the detective work.";
    Messages.sendTextMessage(senderID, introMessage);
    Messages.sendTextMessage(senderID, "Here are some links and books you might find helpful for learning about the curly girl method");
    Messages.sendGenericMessage(senderID);
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