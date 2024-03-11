// Sprint 15.2. Validating Inbound Server Data
// Create a new middleware for validation
// npm install celebrate validator


// 15.2.1. Import validator and celebrate together with joi.
const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

// 15.2.3. Validate URLs for avatars and item images
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

// 15.2.2. Create Validation Functions
const nameValidationMsg = {
  "string.min": 'The minimum length of the "name" field is 2',
  "string.max": 'The maximum length of the "name" field is 30',
  "string.empty": 'The "name" field must be filled in',
};

const imgValidationMsg = {
  "string.empty": 'The "imageUrl" field must be filled in',
  "string.uri": 'the "imageUrl" field must be a valid url',
}

const avatarValidationMsg = {
  "string.empty": 'The "avatar" field must be filled in',
  "string.uri": 'the "avatar" field must be a valid url',
}

const emailValidationMsg = {
  "string.empty": 'The "email" field must be filled in',
  "sting.uri": 'The "email" field must be a valid email',
}

const passwordValidationMsg = {
  "string.empty": 'The "password" field must be filled in',
}





// 15.2.2.1. The clothing item body when an item is created
const validateClothingItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages(nameValidationMsg),
    imageUrl: Joi.string().required().custom(validateURL).messages(imgValidationMsg),
    weather: Joi.string().required().valid("cold", "warm", "hot"),
  }),
});

// 15.2.2.2. The The user info body when a user is created
const validateNewUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages(nameValidationMsg),
    avatar: Joi.string().required().custom(validateURL).messages(avatarValidationMsg),
    email: Joi.string().required().email().messages(emailValidationMsg),
    password: Joi.string().required().messages(passwordValidationMsg),
  }),
});

// 15.2.2.3. Authentication when a user login
const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages(emailValidationMsg),
    password: Joi.string().required().messages(passwordValidationMsg),
  }),
});

// 15.2.2.4. User and clothing item IDs when they are accessed
const validateClothingId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages(nameValidationMsg),
    avatar: Joi.string().required().custom(validateURL).messages(avatarValidationMsg),
  }),
});




module.exports = {
  validateClothingItem,
  validateNewUser,
  validateLogin,
  validateClothingId,
  validateUpdateUser,
};
