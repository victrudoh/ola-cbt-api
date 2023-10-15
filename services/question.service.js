// Models
const questionModel = require("../models/question.model");

// All
exports.allQuestionsService = async () => {
  try {
    const questions = await questionModel.find();
    return questions;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// One
exports.oneQuestionService = async (id) => {
  try {
    const question = await questionModel.findById({ _id: id });
    if (!question) {
      return { error: new Error("Error: Question not found") };
    }
    return question;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// Add
exports.addQuestionService = async (details, courseId) => {
  try {
    const findQuestion = await questionModel.findOne({
      question: details.question,
    });
    if (findQuestion) {
      return { error: new Error("Error: Question already exists") };
    }

    // create question
    const question = new questionModel({ ...details, courseId: courseId });
    await question.save();
    return question;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// Edit
exports.editQuestionService = async (details, id) => {
  try {
    const question = await questionModel.findOne({ _id: id });
    if (!question) {
      return { error: new Error("Error: Question not found") };
    }

    question.question = details.question;
    await question.save();
    return question;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// Delete
exports.deleteQuestionService = async (id) => {
  try {
    const question = await questionModel.findByIdAndRemove({ _id: id });
    if (!question) {
      return { error: new Error("Error: Question not found") };
    }
    return question;
  } catch (error) {
    return { error: new Error(error) };
  }
};
