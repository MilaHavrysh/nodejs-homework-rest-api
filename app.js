const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const contactsRouter = require("./routes/api/contacts/contacts");
const usersRouter = require('./routes/api/users/users');

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const status = err.status ? "error" : "fail";
  res
    .status(statusCode)
    .json({ status, statusCode, message: "missing required name field" });
});

module.exports = app;
