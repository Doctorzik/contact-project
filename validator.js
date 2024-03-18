
const joi = require("joi");


// validator takse a schema object and it returns a function that takes in a payload
// and calls the validation method  on the original schame tha was passed in
// then it returns the output of the validation. which is a value and an error.
const validator = (schema) => (payload) =>
  schema.validate(payload, { aboortEarly: false });


//   user = {
//     firstname: req.body.firstname,
//     lastname: req.body.lastname,
//     email: req.body.email,
//     favorite_color: req.body.favorite_color,
//     birthdate: req.body.birthdat,
//   };

const userSchema = joi.object({
    firstname: joi.string().lowercase().min(3).max(20).required(),
    lastname: joi.string().min(3).max(20).required(),
    email: joi.string().email().required(),
    favorite_color: joi.string().min(3).max(20).required(),
    birthdate: joi.date().less(new Date("2020-01-01")).required()

})




exports.validateUser = validator(userSchema)


