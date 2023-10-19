// Dependencies
const { Router } = require("express");
const express = require("express");
const path = require("path");

// controller
const question = require("../controllers/question.controller");

// Stuff
const router = express.Router();

// schemas
const {
  addQuestionSchema,
  editQuestionSchema,
} = require("../schemas/question.schema");

// middleware
const isAuthenticated = require("../middleware/isAuthenticated");
const { authorize } = require("../middleware/roleCheck");
const validate = require("../middleware/validateSchema.middleware");

// Routes
router.get(
  "/ping",
  // isAuthenticated,
  // authorize("admin"),
  question.getPingController
);

// GET All Questions
router.get(
  "/all",
  // authorize("admin"),
  question.getAllQuestionsController
);

// GET All Questions
router.get(
  "/one",
  // authorize("admin"),
  question.getOneQuestionController
);

// POST Signup
router.post(
  "/add",
  // authorize("admin"),
  validate(addQuestionSchema),
  question.postAddQuestionController
);

// PUT Signup
router.put(
  "/edit",
  // authorize("admin"),
  validate(editQuestionSchema),
  question.postEditQuestionController
);

// DELETE Signup
router.delete(
  "/delete",
  // authorize("admin"),
  question.postDeleteQuestionController
);

module.exports = router;
