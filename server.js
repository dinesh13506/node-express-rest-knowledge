require('dotenv').config()
const express = require('express');
const { binary } = require('joi');
const mailer = require('./nodeMailer/mailer')
const port = 3000
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false}) )



const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({
    passError: true //pass the error to a common place
})

/**
 * convert, allowUnknown,abortEarly
 * these are specific for keys which are not mentioned in schema
 */
const options = {
    joi : { convert:true, allowUnknown: false }
}

/**
 * this is a schema for request body 
 */
 const bodySchema = Joi.object({
    name: Joi.string().required(), //should be string and required
    anything: Joi.any().required(), //can be any data type and is required
    listOfNames: Joi.array().items(Joi.string().invalid(null,'')).required(), // should be an array of strings and is required,null,'' are invalid values,
    binaryValue: Joi.binary().encoding('base64').default("some-base64-value"), //should be binary and base64 encoded, , default is "some-base64-value"
    isHappy: Joi.boolean().required(), // should be boolan and is required,
    minNumber: Joi.number().required(), // should be a number and is required
    maxNumber: Joi.number().required().greater(Joi.ref('minNumber')), //should be a number, is required and greater than minNumber
    message: Joi.when("isHappy",{ is: true, then:Joi.string().required()}) //when isHappy is there and is true then message as a string is required

})

/**
 * this is a schema for request query 
 */
const querySchema = Joi.object({
    pageNumber: Joi.number().required(), 
})

/**
 * this is a schema for request headers 
 */
const headersSchema = Joi.object({
    token: Joi.string().required(), 
})

const headerJoiOptions = {
    joi : { convert:true, allowUnknown: true }
}
app.post('/',validator.headers(headersSchema, headerJoiOptions),validator.query(querySchema, options),validator.body(bodySchema, options), (req, res) => {
  console.log(req.body)
  res.send(`Hello ${req.body.name}`)
})

/**
 * send email schema
 */

const sendEmailBodySchema = Joi.object({
  subject: Joi.string().required(),
  senderName: Joi.string().required(),
  senderEmail: Joi.string().email({ tlds: { allow: false } }).required(),
  receivers: Joi.array().required().items(Joi.string().email({tlds : {allow: false}})).min(1),
  textMessage: Joi.string().required(),
  htmlBody: Joi.string(),
})

app.post('/sendEmail',validator.body(sendEmailBodySchema, options), async(req, res) => {
  try {
    const body = req.body
    const response = await mailer.sendEmail(body)
    res.status(200).json(response)
    
  } catch (error) {
    console.log(error)
  }
})

app.listen(port, () => {
  console.log(`server has started listening  at http://localhost:${port}`)
})


/**
 * joi error will be passed here
 */
app.use((err, req, res, next) => {
    if (err && err.error && err.error.isJoi) {
      // we had a joi error, let's return a custom 400 json response
      res.status(400).json({
        type: err.type, // will be "query" here, but could be "headers", "body", or "params"
        message: err.error.toString()
      });
    } else {
      // pass on to another error handler
      next(err);
    }
});