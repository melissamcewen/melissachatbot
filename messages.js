const request = require('request');
const API = require('./api');


//This is a basic text reply

function sendTextMessage(recipientId, messageText) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };

  return API.callSendAPI(messageData);
}



function sendGreeting(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: "Oh hello! Sorry I didn't notice you, I've been reading this wonderful book. It's my favorite part because—you'll see Here's where she meets Prince Charming. But she won't discover that it's him 'til Chapter Three!",
          buttons:[
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
        
        ]
        }
      }
    }
  };  

  API.callSendAPI(messageData);
}


function sendButtons(recipientId, text, buttons) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: text,
          buttons: buttons
        }
      }
    }
  };  

  API.callSendAPI(messageData);
}




module.exports = {
   sendTextMessage,
   sendButtons,
   sendGreeting
}