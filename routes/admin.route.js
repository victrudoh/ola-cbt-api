// Dependencies
const { Router } = require("express");
const express = require("express");
const path = require("path");

// controller
const auth = require("../controllers/auth.controller");

// Stuff
const router = express.Router();

const validate = require("../middleware/validateSchema.middleware");

// schemas
const {
  addCourseSchema,
  editCourseSchema,
} = require("../schemas/course.schema");

// middleware
const isAuthenticated = require("../middleware/isAuthenticated");
const { authorize } = require("../middleware/roleCheck");

// Routes
router.get(
  "/ping",
  isAuthenticated,
  authorize("admin"),
  auth.getPingController
);

// POST Signup
router.post(
  "/courses/add",
  authorize("admin"),
  validate(addCourseSchema),
  auth.postSignupController
);

// PUT Signup
router.put(
  "/courses/edit",
  authorize("admin"),
  validate(editCourseSchema),
  auth.postSignupController
);

// GET All Courses
router.get("/courses", authorize("admin"), auth.postLoginController);

module.exports = router;
