// servcies
const questionServices = require("../services/question.service");

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
  getAllQuestionsController: async (req, res, next) => {
    try {
      const allQuestions = await questionServices.allQuestionsService();

      if (allQuestions?.error) {
        return sendError(res, 400, allQuestions?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "fetched all questions successfully",
        data: {
          allQuestions,
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
  getOneQuestionController: async (req, res, next) => {
    try {
      const { id } = req.query;
      const question = await questionServices.oneQuestionService(id);

      if (question?.error) {
        return sendError(res, 400, question?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Fetched question successfully",
        data: {
          question,
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
  postAddQuestionController: async (req, res, next) => {
    try {
      const { courseId } = req.query;
      const question = await questionServices.addQuestionService(
        req.body,
        courseId
      );

      if (question?.error) {
        return sendError(res, 400, question?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Question created successfully",
        data: {
          question,
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
  postEditQuestionController: async (req, res, next) => {
    try {
      const { id } = req.query;
      const question = await questionServices.editQuestionService(req.body, id);

      if (question?.error) {
        return sendError(res, 400, question?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Edited question successfully",
        data: {
          question,
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
  postDeleteQuestionController: async (req, res, next) => {
    try {
      const { id } = req.query;
      const question = await questionServices.deleteQuestionService(id);

      if (question?.error) {
        return sendError(res, 400, question?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Deleted question successfully",
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
