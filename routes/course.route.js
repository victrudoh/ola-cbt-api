// Dependencies
const { Router } = require("express");
const express = require("express");
const path = require("path");

// controller
const course = require("../controllers/course.controller");

// Stuff
const router = express.Router();

// schemas
const {
  addCourseSchema,
  editCourseSchema,
} = require("../schemas/course.schema");

// middleware
const isAuthenticated = require("../middleware/isAuthenticated");
const { authorize } = require("../middleware/roleCheck");
const validate = require("../middleware/validateSchema.middleware");

// Routes
router.get(
  "/ping",
  // isAuthenticated,
  // authorize("admin"),
  course.getPingController
);

// GET All Courses
router.get(
  "/",
  // authorize("admin"),
  course.getAllCoursesController
);

// GET All Courses
router.get(
  "/one",
  // authorize("admin"),
  course.getOneCourseController
);

// POST Signup
router.post(
  "/add",
  // authorize("admin"),
  validate(addCourseSchema),
  course.postAddCourseController
);

// PUT Signup
router.put(
  "/edit",
  // authorize("admin"),
  validate(editCourseSchema),
  course.postEditCourseController
);

// DELETE Signup
router.delete(
  "/delete",
  // authorize("admin"),
  course.postDeleteCourseController
);

module.exports = router;
