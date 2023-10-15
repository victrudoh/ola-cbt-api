// Models
const testModel = require("../models/test.model");
const questionModel = require("../models/question.model");
const answerModel = require("../models/answer.model");
const { ObjectId } = require("mongodb");

// All
exports.allTestsService = async () => {
  try {
    const tests = await testModel.find();
    return tests;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// One
exports.oneTestService = async (id) => {
  try {
    const test = await testModel.findById({ _id: id });
    if (!test) {
      return { error: new Error("Error: Test not found") };
    }
    return test;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// Add
exports.addTestService = async (CourseId, user) => {
  try {
    const questions = await questionModel.find({
      courseId: CourseId,
    });

    let testQuestions = [];

    const usedIndexes = new Set(); // To keep track of used indexes

    function shuffleArray(array) {
      // Fisher-Yates shuffle algorithm
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    const shuffledQuestions = shuffleArray(questions); // Shuffle the questions array

    await Promise.all(
      shuffledQuestions.map(async (item) => {
        if (testQuestions.length < 30) {
          const answer = await answerModel.find({
            questionId: item.id,
          });
          const shuffledAnswers = shuffleArray(answer);
          const question = {
            question: item,
            answers: shuffledAnswers,
            chosenAnswer: null,
            attempted: false,
            correctAnswer: false,
          };

          // Find an available random index
          let randomIndex;
          do {
            randomIndex = Math.floor(
              Math.random() * (testQuestions.length + 1)
            );
          } while (usedIndexes.has(randomIndex));

          // Insert the question at the chosen random index
          testQuestions.splice(randomIndex, 0, question);
          usedIndexes.add(randomIndex);
        }
      })
    );

    // Trim the array to ensure it doesn't exceed 30 elements
    if (testQuestions.length > 30) {
      testQuestions.splice(30);
    }

    // create test
    const test = new testModel({
      userId: user.id,
      courseId: CourseId,
      questions: testQuestions,
      totalQuestions: testQuestions.length,
    });
    console.log(
      "🚀 ~ file: test.service.js:95 ~ exports.addTestService= ~ test:",
      test
    );
    await test.save();
    return test;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// Answer Question
exports.answerTestService = async (testId, answerId, questionIndex) => {
  try {
    const index = parseInt(questionIndex);
    const test = await testModel.findOne({ _id: testId });

    if (!test) {
      return { error: new Error("Error: Test not found") };
    }

    if (test.testEnded) {
      return { error: new Error("Error: Test has ended") };
    }

    const answer = await answerModel.findOne({ _id: answerId });
    if (!answer) {
      return { error: new Error("Error: Answer not found") };
    }

    const totalQuestions = test.totalQuestions; // Retrieve totalQuestions from the test data

    if (index >= 0 && index < test.questions.length) {
      const question = test.questions[index];

      // Check if the chosen answer is correct
      if (answer.isAnswer) {
        test.questions[index] = {
          ...test.questions[index],
          attempted: true,
          correctAnswer: true,
          chosenAnswer: answer,
        };

        // Increase attempted question count
        if (test.attemptedQuestions < totalQuestions) {
          test.attemptedQuestions++;
        }

        // Increase correct answer count
        if (test.correctAnswers < totalQuestions) {
          test.correctAnswers++;
        }

        // Mark the test as ended when all questions have been attempted
        // if (test.attemptedQuestions === totalQuestions) {
        //   test.testEnded = true;
        // }

        // Save the updated test
        await test.save();

        return test;
      } else {
        test.questions[index] = {
          ...test.questions[index],
          attempted: true,
          correctAnswer: false,
          chosenAnswer: answer,
        };

        // Increase attempted question count
        if (test.attemptedQuestions < totalQuestions) {
          test.attemptedQuestions++;
        }

        // Save the updated test
        await test.save();

        return test;
      }
    }

    return { error: new Error("Error: Invalid index or answer selection") };
  } catch (error) {
    return { error: new Error(error) };
  }
};

// End test
exports.endTestService = async (testId) => {
  try {
    const test = await testModel.findOne({ _id: testId });

    if (!test) {
      return { error: new Error("Error: Test not found") };
    }

    test.testEnded = true;
    await test.save();
    return test;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// Delete
exports.deleteTestService = async (id) => {
  try {
    const test = await testModel.findByIdAndRemove({ _id: id });
    if (!test) {
      return { error: new Error("Error: Test not found") };
    }
    return test;
  } catch (error) {
    return { error: new Error(error) };
  }
};
