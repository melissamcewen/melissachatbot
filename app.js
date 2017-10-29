//
// Section 1: Our Server
// So let's include the Node.js modules we need and create our Express server
//
'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');


// The rest of the code implements the routes for our Express server.
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Webhook validation
app.get('/webhook', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);          
  }
});

// Set Express to listen out for HTTP requests
var server = app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port %s", server.address().port);
});

//We'll make a nice webpage in case someone accidentally ends up here :)

var messengerButton = "<html><head><title>CurlsBot</title></head><body><h1>Facebook Messenger Bot</h1> I'm a wee bot to give hair care advice for curly hair. For more details, see their <a href=\"https://developers.facebook.com/docs/messenger-platform/guides/quick-start\">docs</a>.<script src=\"https://button.glitch.me/button.js\" data-style=\"glitch\"></script><div class=\"glitchButton\" style=\"position:fixed;top:20px;right:20px;\"></div></body></html>";


// Display the web page
app.get('/', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(messengerButton);
  res.end();
});


//
// Section 2
// Talk to FB API
// 
//

// Message processing
app.post('/webhook', function (req, res) {
  console.log(req.body);
  var data = req.body;

  // Make sure this is a page subscription
  if (data.object === 'page') {
    
    // Iterate over each entry - there may be multiple if batched
    data.entry.forEach(function(entry) {
      var pageID = entry.id;
      var timeOfEvent = entry.time;

      // Iterate over each messaging event
      entry.messaging.forEach(function(event) {
        if (event.message) {
          receivedMessage(event);
        } else if (event.postback) {
          receivedPostback(event);   
        } else {
          console.log("Webhook received unknown event: ", event);
        }
      });
    });

    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know
    // you've successfully received the callback. Otherwise, the request
    // will time out and we will keep trying to resend.
    res.sendStatus(200);
  }
});

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


// our fancy settings
// Set FB bot persistent menu



var get_started = {
  "get_started":{
    "payload":"get_started"
  }
}; 
facebookMessengerProfile(get_started);
function facebookMessengerProfile(json_file){
	request({
      url: 'https://graph.facebook.com/v2.6/me/messenger_profile',
      qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
      method: 'POST',
	    json: json_file
    }, function(error, response, body) {
	    if (error) {
		    console.log('Error sending messages: ', error);
	    } else if (response.body.error) {
		    console.log('Error: ', response.body.error);
	    }
    });
}

 



//
// Section 3
// Handle messages 
// 
//

// Incoming events handling
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
        sendTextMessage(senderID, "about curly girl");
        break;
      case 'generic':
        sendGenericMessage(senderID);
        break;

      default:
        sendTextMessage(senderID, messageText);
    }
  } else if (messageAttachments) {
    sendTextMessage(senderID, "Oops, I'm just a baby bot, I don't know how to read pictures yet, I'll let you know when I can.");
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
      sendTextMessage(senderID, "Welcome, as a baby \uD83D\uDC76 bot \uD83E\uDD16 right now all I can really do is read ingredients. Would you like to send me some? I'll take a look.");
  }
  if (payload === "about_curly_girl"){
    var introMessage = "The curly girl method is a way of caring for your naturally curly or wavy hair that helps it look its best."
    + "A important principle is hair should be gently washed without sulfates using a sulfate-free shampoo or conditioner cowash."
    + "But that also means that you need to avoid most silicones and waxes, which build up on the hair and require sulfates to remove."
    + "I can help you find what products have the right ingredients, just send me ingredient lists and I'll do the detective work.";
    sendTextMessage(senderID, introMessage);
    sendTextMessage(senderID, "Here are some links and books you might find helpful for learning about the curly girl method");
    sendGenericMessage(senderID);
  }

  console.log("Received postback for user %d and page %d with payload '%s' " + 
    "at %d", senderID, recipientID, payload, timeOfPostback);

  // When a postback is called, we'll send a message back to the sender to 
  // let them know it was successful
  //sendTextMessage(senderID, "Postback called");
}

//////////////////////////
// Sending helpers
//////////////////////////
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

