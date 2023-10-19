// Models
const questionModel = require("../models/question.model");

// All
exports.allQuestionsService = async (id) => {
  try {
    const question = await questionModel.find({ courseId: id });
    //  if (!question) {
    //    return { error: new Error("Error: Questions not found") };
    //  }
    return question;
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
    question.answer_a = details.answer_a;
    question.answer_b = details.answer_b;
    question.answer_c = details.answer_c;
    question.answer_d = details.answer_d;
    question.correct_answer = details.correct_answer;
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
