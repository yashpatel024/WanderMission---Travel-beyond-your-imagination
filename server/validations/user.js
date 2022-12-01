import Joi from "joi";

/*
Fields declared with validations
Joi print message by default if value is invalid
Password must have custom 
*/
const email = Joi.string().email().required();

const username = Joi.string().alphanum().min(3).max(30).required();

const message =
    "Password must be of length 6-16, " +
    "have at least one capital character, " +
    "one lowercase letter, one digit, " +
    "and one special character";

const password = Joi.string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .options({ language: { string: { regex: { base: message } } } });

export const SignUp = Joi.object().keys({
    email,
    username,
    password,
});

export const SignIn = Joi.object().keys({
    email,
    password,
});
