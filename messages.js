const request = require('request');
var API = require('./api');


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

/// this is an example of using an advanced template

function sendGenericMessage(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [{
            title: "How To Follow The Curly Girl Method",
            item_url: "https://www.naturallycurly.com/curlreading/no-poo/the-curly-girl-method-for-coily-hair/",               
            image_url: "https://content.naturallycurly.com/wp-content/uploads/2016/07/cg-method-1.jpg"
          }, {
            title: "Curly Girl: The Handbook ",
            subtitle: "This is the book that started it all!",
            item_url: "https://www.amazon.com/Curly-Girl-Handbook-Michele-Bender/dp/076115678X",               
            image_url: "https://images-na.ssl-images-amazon.com/images/I/51GRZvUlT4L._SX410_BO1,204,203,200_.jpg"
          },
          { title: "How to Follow the Curly Girl Method for Curly Hair",
            subtitle: "A good article with step by step instructions",
            item_url: "http://www.wikihow.com/Follow-the-Curly-Girl-Method-for-Curly-Hair",   
            buttons: [{
              type: "web_url",
              url:"http://www.wikihow.com/Follow-the-Curly-Girl-Method-for-Curly-Hair",
              title: "Check it out"
            }]
          }
          ]
        }
      }
    }
  };  

  API.callSendAPI(messageData);
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
          text: "Hi this is the bot version of Melissa McEwen, I'm a web developer and writer based in Chicago, IL. What would you like to know about me?",
          buttons:[
          {
            type:"postback",
            payload:"work",
            title:"I'd like to know about your work"
          },
          {
            type:"web_url",
            url: "http://google.com",
            title: "Go to google"
          }
        
        ]
        }
      }
    }
  };  

  API.callSendAPI(messageData);
}





module.exports = {
   sendTextMessage,
   sendGenericMessage,
   sendGreeting
}