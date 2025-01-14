import Joi, { CustomHelpers } from "joi";

// Regular expression for password validation
const regexName = /^(?!.*(.)\1{2})[a-zA-Z]+(?: [a-zA-Z]+)*$/;
const regexPhone = /^\+62\d{8,13}$/;
const regexEmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
const regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

export const nameSchema = Joi.string()
  .trim()
  .required()
  .min(3)
  .max(50)
  .pattern(regexName)
  .messages({
    "string.base": "Name must be a string.",
    "string.empty": "Name cannot be empty.",
    "string.min": "Name must be at least 3 characters long.",
    "string.max": "Name must have a maximum length of 50 characters.",
    "string.pattern.base": "The name you entered is invalid.",
    "any.required": "Name is required.",
  });

export const emailSchema = Joi.string()
.trim()
.required()
.custom((value: string, helpers: CustomHelpers) => {
    if (!regexEmail.test(value)) {
        return helpers.error("string.pattern.base", { value });
    }
    return value;
})
.messages({
    "string.base": "Email must be a string.",
    "string.empty": "Email cannot be empty.",
    "string.email": "Email must be a valid email.",
    "string.pattern.base": "Email must end with '@gmail.com'.",
    "any.required": "Email is required.",
});

export const phoneSchema = Joi.string()
  .trim()
  .min(11)
  .max(15)
  .pattern(regexPhone)
  .required()
  .messages({
    "string.base": "Phone must be a string.",
    "string.empty": "Phone cannot be empty.",
    "string.pattern.base":
      "Invalid phone number. It must start with the country code +62.",
    "string.min": "Phone number must be at least 11 characters.",
    "string.max": "Phone number must have a maximum length of 15 characters.",
    "any.required": "Phone is required.",
  });

export const passwordSchema = Joi.string()
  .min(8)
  .max(20)
  .trim()
  .custom((value: string, helpers: CustomHelpers) => {
    if (!regexPassword.test(value)) {
      return helpers.error("string.pattern.base", { value });
    }
    return value;
  })
  .messages({
    "string.base": "Password must be a string.",
    "string.empty": "Password cannot be empty.",
    "string.min": "Password must be at least 8 characters.",
    "string.max": "Password must not exceed 20 characters.",
    "string.pattern.base":
      "Passwords must contain uppercase letters, lowercase letters, symbols, and numbers, with a minimum of 8 and a maximum of 20 characters.",
    "any.required": "Password is required.",
  });
