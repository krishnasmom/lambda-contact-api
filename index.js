var AWS       = require('aws-sdk');
var validator = require('validator');
var url       = require('url');
var Entities  = require('html-entities').XmlEntities;
entities      = new Entities();
var urlencode = require('urlencode');
            
exports.handler = function(event, context) {
    console.log("Request received:\n", JSON.stringify(event));
    console.log("Context received:\n", JSON.stringify(context));
        
    var email = {};
    
    if (validator.isEmail(urlencode.decode(event.urlencoded.fromemail))){
        var fromemail = urlencode.decode(event.urlencoded.fromemail);
    }
    var from = urlencode.decode(event.urlencoded.from.split('+').join('%20'));
    var subject = urlencode.decode(event.urlencoded.subject.split('+').join('%20'));
    var message = urlencode.decode(event.urlencoded.message.split('+').join('%20'));
    
    email.TargetArn = "arn:aws:sns:{{REGION}}:{{ACCOUNTID}}:{{NAME}}";
    email.Subject = "Message from "
            + from
            + " on {{WEBSITE}} :: "
            + subject;
    email.Message = "Subject: "
            + subject
            + "\n\n"
            + message
            + "\n\n"
            + "- "
            + from
            + "\n  ("
            + fromemail
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