# node-express-api-validator

This project uses express-joi-validation npm package for validating Express API's request headers, query and body.


## Sample Validation Schema for request body is: 
```
 const bodySchema = Joi.object({
    name: Joi.string().required(), //should be string and required
    anything: Joi.any().required(), //can be any data type and is required
    listOfNames: Joi.array().items(Joi.string().invalid(null,'')).required(), // should be an array of strings and is required,null,'' are invalid values,
    binaryValue: Joi.binary().encoding('base64').default("some-base64-value"), //should be binary and base64 encoded, , default is "some-base64-value"
    isHappy: Joi.boolean().required(), // should be boolan and is required,
    minNumber: Joi.number().required(), // should be a number and is required
    maxNumber: Joi.number().required().greater(Joi.ref('minNumber')) //should be a number, is required and greater than minNumber

})

```

### Sample curl 
```
curl --location --request POST 'http://localhost:3000?pageNumber=1' \
--header 'token: mytoken' \
--header 'Content-Type: application/json' \
--header 'Cookie: connect.sid=s%3AUoWiFdHlEjy0vmBWeIBwoC-IUQNXDZCT.lJ8jIfzKSYr0kHFYmGyatsTRRE7rRjWUaRcy6j%2BW6NQ' \
--data-raw '{
    "name":"Dinesh",
    "anything": "I can be anything",
    "listOfNames" : ["Dinesh","Aman"],
    "binaryValue" : "1",
    "isHappy": true,
    "minNumber": 1,
    "maxNumber" : 2,
    "message" : "I am isHappy"
    }'
```

### Sample curl for send email

```
curl --location --request POST 'http://localhost:3000/sendEmail' \
--header 'Content-Type: application/json' \
--header 'Cookie: connect.sid=s%3AUoWiFdHlEjy0vmBWeIBwoC-IUQNXDZCT.lJ8jIfzKSYr0kHFYmGyatsTRRE7rRjWUaRcy6j%2BW6NQ' \
--data-raw '{
    "subject":"Hello By NodeMailer",
    "senderName":"Node App",
    "senderEmail" : "do-not-reply-nodeapp@gmail.com",
    "receivers":["abc@gmail.com"],
    "textMessage":"Hello World!",
    "htmlBody": "<b> Hello World!</b>"
}'
```

Useful Links


* [express-joi-validation](https://www.npmjs.com/package/express-joi-validation)
* [Joi API Documentation](https://joi.dev/api/?v=17.4.2)
* [Getting Started with express](https://expressjs.com/en/starter/hello-world.html)

