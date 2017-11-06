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



function sendImage(recipientId, image) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "image",
        payload: {
          url: image,
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
   sendImage,
   sendButtons
}