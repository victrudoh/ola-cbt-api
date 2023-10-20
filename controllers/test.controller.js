// servcies
const testServices = require("../services/test.service");

// utils
const { sendError, sendResponse } = require("../utils/response.util");

module.exports = {
  //   PING: Test API connection
  getPingController: (req, res) => {
    try {
      return res.status(200).send({
        success: true,
        message: "Pong!",
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "Something went wrong!",
        errMessage: err.message,
      });
    }
  },

  //  All
  getAllTestsController: async (req, res, next) => {
    try {
      const allTests = await testServices.allTestsService();

      if (allTests?.error) {
        return sendError(res, 400, allTests?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "fetched all tests successfully",
        data: {
          allTests,
        },
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "Something went wrong!",
        errMessage: err.message,
      });
    }
  },

  //  One
  getOneTestController: async (req, res, next) => {
    try {
      const { id } = req.query;
      const test = await testServices.oneTestService(id);

      if (test?.error) {
        return sendError(res, 400, test?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Fetched test successfully",
        data: {
          test,
        },
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "Something went wrong!",
        errMessage: err.message,
      });
    }
  },

  // Add
  postAddTestController: async (req, res, next) => {
    try {
      const { courseId, userId } = req.query;
      const test = await testServices.addTestService(courseId, userId);
      console.log(
        "🚀 ~ file: test.controller.js:80 ~ postAddTestController: ~ req.user):",
        req.user
      );

      if (test?.error) {
        return sendError(res, 400, test?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Test created successfully",
        data: {
          test,
        },
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "Something went wrong!",
        errMessage: err.message,
      });
    }
  },

  // Answer Question
  postAnswerTestController: async (req, res, next) => {
    try {
      const { testId, answerId, index, questionId } = req.query;

      const { answer } = req.body;

      const test = await testServices.answerTestService(
        testId,
        questionId,
        answer,
        // answerId,
        index
      );

      if (test?.error) {
        return sendError(res, 400, test?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Attempted question successfully",
        data: {
          test,
        },
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "Something went wrong!",
        errMessage: err.message,
      });
    }
  },

  // Edit
  postEndTestController: async (req, res, next) => {
    try {
      const { testId } = req.query;
      const test = await testServices.endTestService(testId);

      if (test?.error) {
        return sendError(res, 400, test?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Ended test successfully",
        data: {
          test,
        },
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "Something went wrong!",
        errMessage: err.message,
      });
    }
  },

  //   Delete
  postDeleteTestController: async (req, res, next) => {
    try {
      const { id } = req.query;
      const test = await testServices.deleteTestService(id);

      if (test?.error) {
        return sendError(res, 400, test?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Deleted test successfully",
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "Something went wrong!",
        errMessage: err.message,
      });
    }
  },
};
