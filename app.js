require("dotenv").config();

// must have require lines first, or else it will cause a linter error - per reviewer

// External requirements
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Internal Requirements
// Sprint 15.2.5. Handle Errors
const { errors } = require("celebrate");
// Sprint 15.1. Create New Middleware
const errorHandler = require("./middlewares/errorHandler");
// Sprint 15.3. Logger
const { requestLogger, errorLogger } = require("./middlewares/logger");
// celebrate needed to be imported before routes
const routes = require("./routes");

// start code here.  After all the require statments.
const { PORT = 3001 } = process.env;
const app = express();
app.use(cors());

mongoose.connect(
  "mongodb://127.0.0.1:27017/wtwr_db",
  () => {
    console.log("Connected to Mongoose DB on port 27017");
  },
  (e) => console.log("DB error", e),
);

app.use(express.json());

// Sprint 15.3. Logger
app.use(requestLogger);

// 1. Set up server crash testing
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.use(routes);
app.use(errorLogger);

// Sprint 15.2.5. Validate indbound data
app.use(errors());
// Sprint 15.1. Create New Middleware
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
  console.log("This is working");
});
