const rateLimit = require("express-rate-limit");
const { HttpCode } = require("./constants");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 100 requests per windowMs
  handler: (req, res) => {
    res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      message: "Too many requests",
    });
  },
});

module.exports = limiter;
