// Dependencies
const mongoose = require("mongoose");

// Stuff
const Schema = mongoose.Schema;

// Answer Schema
const answerSchema = new Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isAnswer: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Answer", answerSchema);
