"use strict"

const nodemailer = require("nodemailer");

async function sendEmail(params) {
    //console.log(process.env.email)
    //console.log(process.env.password)
    /**
      * create reusable transporter object using the default SMTP transport
    */
    let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.email, // gamil username
        pass: process.env.password, // gamil password
    },
    });

    const receivers = params.receivers.toString()
    let info = await transporter.sendMail({
        from: `${params.senderName} <${params.senderEmail}>`, // sender address
        to: receivers, // list of receivers
        subject: params.subject, // Subject line
        text: params.textMessage, // plain text body
        html: params.htmlBody, // html body
      });
    
    console.log("Message sent: %s", info.messageId);
    return "success"
}

module.exports = {
    sendEmail : sendEmail,
}