// Dependencies
const { Router } = require("express");
const express = require("express");
const path = require("path");

// controller
const test = require("../controllers/test.controller");

// Stuff
const router = express.Router();

// schemas
// const { addTestSchema, editTestSchema } = require("../schemas/test.schema");

// middleware
const isAuthenticated = require("../middleware/isAuthenticated");
const { authorize } = require("../middleware/roleCheck");
const validate = require("../middleware/validateSchema.middleware");

// Routes
router.get(
  "/ping",
  // isAuthenticated,
  // authorize("admin"),
  test.getPingController
);

// GET All Tests
router.get(
  "/",
  // authorize("admin"),
  test.getAllTestsController
);

// GET All Tests
router.get(
  "/one",
  // authorize("admin"),
  test.getOneTestController
);

// POST Signup
router.post(
  "/add",
  // authorize("admin", "user"),
  //   validate(addTestSchema),
  test.postAddTestController
);

// PUT Signup
router.post(
  "/answer",
  // authorize("admin", "user"),
  //   validate(editTestSchema),
  test.postAnswerTestController
);

// PUT Signup
router.get(
  "/end",
  // authorize("admin", "user"),
  //   validate(editTestSchema),
  test.postEndTestController
);

// DELETE Signup
router.delete(
  "/delete",
  // authorize("admin", "user"),
  test.postDeleteTestController
);

module.exports = router;
