// Dependencies
const { Router } = require("express");
const express = require("express");
const path = require("path");

// controller
const answer = require("../controllers/answer.controller");

// Stuff
const router = express.Router();

// schemas
const {
  addAnswerSchema,
  editAnswerSchema,
} = require("../schemas/answer.schema");

// middleware
const isAuthenticated = require("../middleware/isAuthenticated");
const { authorize } = require("../middleware/roleCheck");
const validate = require("../middleware/validateSchema.middleware");

// Routes
router.get(
  "/ping",
  isAuthenticated,
  authorize("admin"),
  answer.getPingController
);

// GET All Answers
router.get("/", authorize("admin"), answer.getAllAnswersController);

// GET All Answers
router.get("/one", authorize("admin"), answer.getOneAnswerController);

// POST Signup
router.post(
  "/add",
  authorize("admin"),
  validate(addAnswerSchema),
  answer.postAddAnswerController
);

// PUT Signup
router.put(
  "/edit",
  authorize("admin"),
  validate(editAnswerSchema),
  answer.postEditAnswerController
);

// DELETE Signup
router.delete("/delete", authorize("admin"), answer.postDeleteAnswerController);

module.exports = router;
