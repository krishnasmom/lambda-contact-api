var AWS       = require('aws-sdk');
var validator = require('validator');
var url       = require('url');
var Entities  = require('html-entities').XmlEntities;
entities      = new Entities();
            
exports.handler = function(event, context) {
    console.log("Request received:\n", JSON.stringify(event));
    console.log("Context received:\n", JSON.stringify(context));
    
    var email = {};
    email.TargetArn = "arn:aws:sns:us-east-1:073338330571:justinfox";
    email.Subject = "Message from "
            + validator.escape(event.from)
            + " on justinfox.me :: "
            + validator.escape(event.subject);
    email.Message = "Subject: "
            + validator.escape(event.subject)
            + "\n\n"
            + entities.decode(validator.escape(event.message))
            + "\n\n"
            + "- "
            + validator.escape(event.from)
            + "\n  ("
            + validator.escape(event.email || event.fromemail)
            + ")";

    var sns = new AWS.SNS();
    sns.publish(email, function(err,data){
        if (err) {
            console.log('Error sending a message: ', err);
            context.done(null, {"Status":"Error","Message":err});
        } else {
            console.log('Sent message: ', data.MessageId);
            context.done(null, {"Staus":"Success", "Id": data.MessageId});
        }
    });

};
