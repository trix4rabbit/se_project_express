const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");

// Sprint 15.1. Create custom error contstructors
const BadRequestError = require("../utils/errors/BadRequestError");
const ConflictError = require("../utils/errors/ConflictError");
const NotFoundError = require("../utils/errors/NotFoundError");
const UnauthorizedError = require("../utils/errors/UnauthorizedError");

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  if (!name || !avatar || !email || !password) {
    next(new BadRequestError("Invalid data"));
  }
  User.findOne({ email })
    .then((user) => {
      if (user) {
        next(new ConflictError("Email is already in use"));
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      const payload = user.toObject();
      delete payload.password;
      res.status(201).send({ data: payload });
    })
    // Sprint 15.1. Create custom error contstructors
    // Pass the corresponding error objects to the middleware.
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError(err.message));
      } else if (err.message === "Please enter a valid email") {
        next(new BadRequestError(err.message));
      } else if (err.message === "Email is already in use") {
        next(new ConflictError(err.message));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new BadRequestError("Invalid credentials"));
  }

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    // Sprint 15.1. Create custom error contstructors
    // Pass the corresponding error objects to the middleware.
    .catch((err) => {
      next(new UnauthorizedError(err.message));
    });
};

const getCurrentUser = (req, res, next) => {
  const id = req.user._id;

  User.findById(id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError("User not found"));
      }
      res.send({ data: user });
    })
    // Sprint 15.1. Create custom error contstructors
    // Pass the corresponding error objects to the middleware.
    .catch((err) => {
      if (err.message === "User not found") {
        next(new NotFoundError(err.message));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  const id = req.user._id;
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    id,
    { $set: { name, avatar } },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    // Sprint 15.1. Create custom error contstructors
    // Pass the corresponding error objects to the middleware.
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateUser,
};
