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


Useful Links


* [express-joi-validation](https://www.npmjs.com/package/express-joi-validation)
* [Joi API Documentation](https://joi.dev/api/?v=17.4.2)
* [Getting Started with express](https://expressjs.com/en/starter/hello-world.html)

