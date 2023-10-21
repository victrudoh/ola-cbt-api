// Dependencies
const { Router } = require("express");
const express = require("express");
const path = require("path");

// controller
const user = require("../controllers/user.controller");

// Stuff
const router = express.Router();

// schemas
// const { addUserSchema, editUserSchema } = require("../schemas/user.schema");

// middleware
const isAuthenticated = require("../middleware/isAuthenticated");
const { authorize } = require("../middleware/roleCheck");
const validate = require("../middleware/validateSchema.middleware");

// Routes
router.get("/ping", user.getPingController);

// GET All Users
router.get("/", user.getAllUsersController);

// GET One Users
router.get("/one", user.getOneUserController);

// GET One User tests
router.get("/tests", user.getOneUserTestsService);

// POST Signup
// router.post(
//   "/add",
//   authorize("admin"),
//   validate(addUserSchema),
//   user.postAddUserController
// );

// // PUT Signup
// router.put(
//   "/edit",
//   authorize("admin"),
//   validate(editUserSchema),
//   user.postEditUserController
// );

// DELETE Signup
router.delete(
  "/delete",
  // authorize("admin"),
  user.postDeleteUserController
);

module.exports = router;
