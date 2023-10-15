// Dependencies
const mongoose = require("mongoose");

// Stuff
const Schema = mongoose.Schema;

// Question Schema
const questionSchema = new Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    media: {
      type: Object,
    },
    // chosenAnswer: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Answer",
    // },
    attempted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Question", questionSchema);
