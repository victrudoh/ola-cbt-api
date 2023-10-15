// servcies
const courseServices = require("../services/course.service");

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
  getAllCoursesController: async (req, res, next) => {
    try {
      const allCourses = await courseServices.allCoursesService();

      if (allCourses?.error) {
        return sendError(res, 400, allCourses?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "fetched all courses successfully",
        data: {
          allCourses,
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
  getOneCourseController: async (req, res, next) => {
    try {
      const { id } = req.query;
      const course = await courseServices.oneCourseService(id);

      if (course?.error) {
        return sendError(res, 400, course?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Fetched course successfully",
        data: {
          course,
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
  postAddCourseController: async (req, res, next) => {
    try {
      const course = await courseServices.addCourseService(req.body);

      if (course?.error) {
        return sendError(res, 400, course?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Course created successfully",
        data: {
          course,
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
  postEditCourseController: async (req, res, next) => {
    try {
      const { id } = req.query;
      const course = await courseServices.editCourseService(req.body, id);

      if (course?.error) {
        return sendError(res, 400, course?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Edited course successfully",
        data: {
          course,
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
  postDeleteCourseController: async (req, res, next) => {
    try {
      const { id } = req.query;
      const course = await courseServices.deleteCourseService(id);

      if (course?.error) {
        return sendError(res, 400, course?.error?.message);
      }

      return res.status(200).send({
        success: true,
        message: "Deleted course successfully",
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
