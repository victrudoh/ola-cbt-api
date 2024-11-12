// Import Routes
const authRouter = require("./auth.route");
const adminRouter = require("./admin.route");
const courseRouter = require("./course.route");
const questionRouter = require("./question.route");
const answerRouter = require("./answer.route");
const testRouter = require("./test.route");
const userRouter = require("./user.route");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // Allows all origins. Replace "*" with specific domains if needed.
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    ); // Specify allowed HTTP methods.

    // Handle preflight OPTIONS request
    if (req.method === "OPTIONS") {
      return res.sendStatus(204);
    }

    next();
  });

  app.use("/api/auth", authRouter);
  app.use("/api/courses", courseRouter);
  app.use("/api/questions", questionRouter);
  app.use("/api/answers", answerRouter);
  app.use("/api/tests", testRouter);
  app.use("/api/users", userRouter);
};

// // Import Routes
// const authRouter = require("./auth.route");
// const adminRouter = require("./admin.route");
// const courseRouter = require("./course.route");
// const questionRouter = require("./question.route");
// const answerRouter = require("./answer.route");
// const testRouter = require("./test.route");
// const userRouter = require("./user.route");

// module.exports = function (app) {
//   app.use(function (req, res, next) {
//     res.header(
//       "Access-Control-Allow-Headers",
//       "x-access-token, Origin, Content-Type, Accept",
//       "Access-Control-Allow-Origin"
//     );
//     next();
//   });

//   app.use("/api/auth", authRouter);
//   app.use("/api/courses", courseRouter);
//   app.use("/api/questions", questionRouter);
//   app.use("/api/answers", answerRouter);
//   app.use("/api/tests", testRouter);
//   app.use("/api/users", userRouter);
// };
