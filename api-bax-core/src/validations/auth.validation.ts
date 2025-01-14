import Joi, { CustomHelpers, ValidationResult } from "joi";
import { Register, Login } from "../types";

const regexName = /^(?!.*(.)\1{2})[a-zA-Z]+(?: [a-zA-Z]+)*$/;
const regexPhone = /^[+\d]+$/;
const regexEmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

export const registerValidation = (payload: Register): ValidationResult => {
    const schema = Joi.object({
        name: Joi.string()
            .trim()
            .required()
            .min(3)
            .max(50)
            .pattern(regexName)
            .messages({
                "string.base": "Name must be a string.",
                "string.empty": "Name cannot be empty.",
                "string.min": "Name must be at least 3 characters long.",
                "string.max":
                    "Name must have a maximum length of 50 characters.",
                "string.pattern.base": "The name you entered is invalid.",
                "any.required": "Name is required.",
            }),
        phone: Joi.string()
            .trim()
            .min(11)
            .max(15)
            .pattern(regexPhone)
            .required()
            .messages({
                "string.base": "Phone must be a string.",
                "string.empty": "Phone cannot be empty.",
                "string.pattern.base": "Invalid phone number.",
                "string.min": "Phone number must be at least 11 characters.",
                "string.max":
                    "Phone number must have a maximum length of 15 characters.",
                "any.required": "Phone is required.",
            }),
        email: Joi.string()
            .email({ minDomainSegments: 2 })
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
            }),
        password: Joi.string()
            .min(8)
            .max(20)
            .trim()
            // .required()
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
            }),
        role: Joi.string()
            .valid(
                "ADMIN",
                "MITRA",
                "AFFILIATE",
                "CUSTOMER",
                "STUDENTS",
                "LECTURER",
            )
            .required()
            .messages({
                "string.base": "Role must be a string.",
                "string.empty": "Role cannot be empty.",
                "any.only":
                    "Role must be one of ADMIN, MITRA, AFFILIATE, CUSTOMER, LECTURER, or STUDENTS.",
                "any.required": "Role is required.",
            }),
        referrerId: Joi.string()
            .trim()
            .min(3)
            .max(50)
            .pattern(/^[a-zA-Z0-9-]+$/) // Pattern huruf, angka, - dan
            .allow(null, "")
            .messages({
                "string.base": "Referral code must be a string.",
                "string.min":
                    "Referral code must be at least 3 characters long.",
                "string.max":
                    "Referral code can be a maximum of 50 characters.",
                "string.pattern.base":
                    "Referral code can only contain letters, numbers, dashes (-), and underscores (_).",
            }),
    });

    return schema.validate(payload, { abortEarly: false });
};

export const loginValidation = (payload: Login): ValidationResult => {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2 })
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
            }),
        password: Joi.string()
            .min(8)
            .max(20)
            .trim()
            // .required()
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
            }),
    });

    return schema.validate(payload, { abortEarly: false });
};
