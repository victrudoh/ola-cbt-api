// Dependencies
const mongoose = require("mongoose");

// Stuff
const Schema = mongoose.Schema;

// Course Schema
const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", courseSchema);
