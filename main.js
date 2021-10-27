"use strict"

const nodemailer = require("nodemailer");

async function sendEmail(input) {
    //console.log(process.env.email)
    //console.log(process.env.password)
    /**
      * create reusable transporter object using the default SMTP transport
    */
    let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false, // true for 465, false for other ports
    auth: {
        type: "LOGIN",
        user: "", // gmail username of sender
        pass: "", // gmail password of sender
    },
    });

    const receivers = input.receivers.toString()
    let info = await transporter.sendMail({
        from: `${input.senderName} <${input.senderEmail}>`, // sender address
        to: receivers, // list of receivers
        subject: input.subject, // Subject line
        text: input.textMessage, // plain text body
        html: input.htmlBody, // html body
      });
    
    console.log("Message sent: %s", info.messageId);
    return "success"
}

const input = {
    "senderName":"Dinesh Kumar",//sender name
    "senderEmail": "", //sender email
    "receivers": [""], //list of receiver emails,
    "subject":"Hello World!",
    "textMessage": "Hey this is a test email :)",
    "htmlBody":"<b>Hey this is a test email :)</b>"
}

sendEmail(input)