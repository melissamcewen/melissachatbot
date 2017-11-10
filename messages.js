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



// the secret code word is "apples"
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

// helper function for nlp handling
function firstEntity(nlp, name) {
  return nlp && nlp.entities && nlp.entities && nlp.entities[name] && nlp.entities[name][0];
}


module.exports = {
   sendTextMessage,
   sendImage,
   sendButtons,
   firstEntity
}