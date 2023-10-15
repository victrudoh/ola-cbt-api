// Models
const answerModel = require("../models/answer.model");
const questionModel = require("../models/question.model");

// All
exports.allAnswersService = async () => {
  try {
    const answers = await answerModel.find();
    return answers;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// One
exports.oneAnswerService = async (id) => {
  try {
    const answer = await answerModel.findById({ _id: id });
    if (!answer) {
      return { error: new Error("Error: Answer not found") };
    }
    return answer;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// Add
exports.addAnswerService = async (details, questionId) => {
  try {
    const findAnswer = await answerModel.findOne({
      content: details.content,
    });
    if (findAnswer) {
      return { error: new Error("Error: Answer already exists") };
    }

    // Check if question already has 4 answer
    const allAnswers = await answerModel.find({
      questionId: questionId,
    });
    if (allAnswers.length >= 4) {
      return {
        error: new Error(
          "Error: maximum number of answers reached for this question, please delete an answer and try again."
        ),
      };
    }

    // check if any answer has been flagged as correct
    const correctAnswer = await answerModel.findOne({
      isAnswer: details.isAnswer,
      questionId: questionId,
    });
    if (correctAnswer) {
      return {
        error: new Error(
          "Error: An answer has already been flagged as correct for this question."
        ),
      };
    }

    // create answer
    const answer = new answerModel({ ...details, questionId });
    await answer.save();
    return answer;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// Edit
exports.editAnswerService = async (details, id) => {
  try {
    const answer = await answerModel.findOne({ _id: id });
    if (!answer) {
      return { error: new Error("Error: Answer not found") };
    }

    // find answer again but by content
    const findAnswer = await answerModel.findOne({
      content: details.content,
    });
    if (findAnswer) {
      return { error: new Error("Error: Answer already exists") };
    }

    // check if any answer has been flagged as correct
    const correctAnswer = await answerModel.findOne({
      isAnswer: details.isAnswer,
    });
    if (correctAnswer) {
      return {
        error: new Error(
          "Error: An answer has already been flagged as correct for this question."
        ),
      };
    }

    answer.content = details.content;
    answer.isCorrect = details.isCorrect;
    await answer.save();
    return answer;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// Delete
exports.deleteAnswerService = async (id) => {
  try {
    const answer = await answerModel.findByIdAndRemove({ _id: id });
    if (!answer) {
      return { error: new Error("Error: Answer not found") };
    }
    return answer;
  } catch (error) {
    return { error: new Error(error) };
  }
};
