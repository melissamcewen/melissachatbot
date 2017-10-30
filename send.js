const request = require('request');

function callSendAPI(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: messageData

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      console.log("Successfully sent generic message with id %s to recipient %s", 
        messageId, recipientId);
    } else {
      console.error("Unable to send message.");
      console.error(response);
      console.error(error);
    }
  });  
}




function sendTextMessage(recipientId, messageText) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };

  return callSendAPI(messageData);
}

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

  callSendAPI(messageData);
}



function sendLink(recipientId, url, title) {
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
            title: title,
            "buttons":[
              {
                "type":"web_url",
                "url": url,
                "title":"View Website"
              }           
            ] 
          }]
        }
      }
    }
  };  

  callSendAPI(messageData);
}

function sendTextList(recipientId, intro, array) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: intro
    }
  };
  
   array.forEach(function(listItem) {
      messageData.message.text  += "\n" + listItem;
  });
  

  callSendAPI(messageData);
}




/*function callSendAPI(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: messageData

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      console.log("Successfully sent generic message with id %s to recipient %s", 
        messageId, recipientId);
    } else {
      console.error("Unable to send message.");
      console.error(response);
      console.error(error);
    }
  });  
}*/


module.exports = {
   sendTextMessage,
  sendGenericMessage
}