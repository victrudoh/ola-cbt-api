// servcies
const answerServices = require("../services/answer.service");

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
  getAllAnswersController: async (req, res, next) => {
    try {
      const allAnswers = await answerServices.allAnswersService();

      if (allAnswers?.error) {
        return sendError(res, 400, allAnswers?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "fetched all answers successfully",
        data: {
          allAnswers,
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
  getOneAnswerController: async (req, res, next) => {
    try {
      const { id } = req.query;
      const answer = await answerServices.oneAnswerService(id);

      if (answer?.error) {
        return sendError(res, 400, answer?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Fetched answer successfully",
        data: {
          answer,
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
  postAddAnswerController: async (req, res, next) => {
    try {
      const { questionId } = req.query;
      const answer = await answerServices.addAnswerService(
        req.body,
        questionId
      );

      if (answer?.error) {
        return sendError(res, 400, answer?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Answer created successfully",
        data: {
          answer,
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
  postEditAnswerController: async (req, res, next) => {
    try {
      const { id } = req.query;
      const answer = await answerServices.editAnswerService(req.body, id);

      if (answer?.error) {
        return sendError(res, 400, answer?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Edited answer successfully",
        data: {
          answer,
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
  postDeleteAnswerController: async (req, res, next) => {
    try {
      const { id } = req.query;
      const answer = await answerServices.deleteAnswerService(id);

      if (answer?.error) {
        return sendError(res, 400, answer?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Deleted answer successfully",
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
