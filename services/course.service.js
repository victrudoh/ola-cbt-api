// Models
const courseModel = require("../models/course.model");

// All
exports.allCoursesService = async () => {
  try {
    const courses = await courseModel.find();
    return courses;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// One
exports.oneCourseService = async (id) => {
  try {
    const course = await courseModel.findById({ _id: id });
    if (!course) {
      return { error: new Error("Error: Course not found") };
    }
    return course;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// Add
exports.addCourseService = async (details) => {
  try {
    const findCourse = await courseModel.findOne({ name: details.name });
    if (findCourse) {
      return { error: new Error("Error: Course already exists") };
    }

    // create course
    const course = new courseModel(details);
    await course.save();
    return course;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// Edit
exports.editCourseService = async (details, id) => {
  try {
    const course = await courseModel.findOne({ _id: id });
    if (!course) {
      return { error: new Error("Error: Course not found") };
    }

    course.name = details.name;
    await course.save();
    return course;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// Delete
exports.deleteCourseService = async (id) => {
  try {
    const course = await courseModel.findByIdAndRemove({ _id: id });
    if (!course) {
      return { error: new Error("Error: Course not found") };
    }
    return course;
  } catch (error) {
    return { error: new Error(error) };
  }
};
