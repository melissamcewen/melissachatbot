const Messages = require('./messages');
const request = require('request');

function receivedMessage(event) {
  // this function should run when we receive a message
  // it grabs the following variables from the message event to use later
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;
  var messageId = message.mid;
  var messageText = message.text;
  var messageAttachments = message.attachments;

  // let's also log some info about the received message in the console
  console.log("Received message for user %d and page %d at %d with message:", senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));




if (messageText) {
    // If we receive a text message, check to see if it matches a keyword and send the correct response
    // if it contains hello, do the following
   if(messageText.includes('hello')){
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
   } else if (messageText.includes('cat')) {
     Messages.sendImage(senderID, "https://cdn.glitch.com/44cfff99-bafa-46b5-83fd-f45ca0be132c%2Fcat.jpg?1509940641670");

   } else if (messageText.includes('meow')){
     //meow back
     Messages.sendTextMessage(senderID, "meow");

   } else {
    // no meow and no hello? Well then our bot has no idea what to do at all, so let's send back a message to let them know our bot is confused
     Messages.sendTextMessage(senderID, "I'm confused");
   }
  } else if (messageAttachments) {
    // if it's an attachment let's send them a message notifying them we don't know what to do with pictures
    Messages.sendTextMessage(senderID, "Oops, I'm just a baby bot, I don't know how to read pictures yet, I'll let you know when I can.");
  }
}

function receivedPostback(event) {
  // this function runs when we receive a postback, let's grab some variables from the data to use
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfPostback = event.timestamp;
  console.log("postback received");
  var payload = event.postback.payload;

  // if our payload/action is "get_started", send them a message with the following buttons
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
      title:"Fav books"
    },
    {
      type:"postback",
      payload: "dreams",
      title: "Your dreams"
    },
    {
      type:"postback",
      payload: "dislikes",
      title: "Your dislikes"
    }

    ];
    
    Messages.sendButtons(senderID, messageText, buttons);

  }
  
  if (payload === "books"){
    var messageText = "My favorite book lately is Romeo & Juliet. It's about two lovers in fair Verona."
    var buttons = [
    {
      type:"postback",
      payload:"goodbye",
      title:"Goodbye"
    }

    ];
    
    Messages.sendButtons(senderID, messageText, buttons);

  }
  
  if (payload === "dreams"){
    var messageText = " I am not sure exactly about all my dreams, but I know I want adventure in the great wide somewhere. I want it more than I can tell. "
    var buttons = [
    {
      type:"postback",
      payload:"goodbye",
      title:"Goodbye"
    }

    ];
    
    Messages.sendButtons(senderID, messageText, buttons);

  }
  
  if (payload === "dislikes"){
    var messageText = "Well there is this man in town named Gaston. Boorish, brainless. He thinks I would want to be his wife. Can you imagine?"
    var buttons = [
    {
      type:"postback",
      payload:"goodbye",
      title:"Goodbye"
    }

    ];
    
    Messages.sendButtons(senderID, messageText, buttons);

  }
  
  
  if (payload === "life"){
    var messageText = "I was just about to go for a walk in town, get a new book to read. I love reading. The library makes our small corner of the world feel big."
    var buttons = [
    {
      type:"postback",
      payload:"town",
      title:"Your town"
    },
    {
      type:"postback",
      payload: "family",
      title: "Your family"
    }

    ];
    
    Messages.sendButtons(senderID, messageText, buttons);

  }
  
  if (payload === "town"){
    var messageText = "Our town isn't much. A quiet village, every day like the one before. Little town, full of little people. I want much more than this provincial life!"
    var buttons = [
    {
      type:"postback",
      payload:"goodbye",
      title:"Goodbye"
    }

    ];
    
    Messages.sendButtons(senderID, messageText, buttons);

  }
  
  if (payload === "family"){
    var messageText = "Oh it's just me and my father, Maurice, he's an inventor. He wants to give up, he's had so much trouble getting his new contraption to work. But I believe in him! We also have a horse, Philippe."
    var buttons = [
    {
      type:"postback",
      payload:"goodbye",
      title:"Goodbye"
    }

    ];
    
    Messages.sendButtons(senderID, messageText, buttons);

  }
  
  if (payload === "goodbye"){
    var messageText = "Well thanks for talking to me, I'm off now, need to put my books in the basket and get to town. I hope Gaston isn't there! Last time I saw him he took my book and threw it into a puddle."
    var buttons = [
    {
      type:"postback",
      payload:"get_started",
      title:"Talk again"
    }

    ];
    
    Messages.sendButtons(senderID, messageText, buttons);

  }


  console.log("Received postback for user %d and page %d with payload '%s' " + 
    "at %d", senderID, recipientID, payload, timeOfPostback);

}



module.exports = {
   receivedPostback,
   receivedMessage
}