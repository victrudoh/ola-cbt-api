// Models
const User = require("../models/user.model");

// Dependencies
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SIGNUP
exports.signupService = async (details) => {
  try {
    // const { firstname, lastname, password } = details;

    // check for user
    if (details.email) {
      //   check if email exist
      const emailExists = await User.findOne({ email: details.email });
      if (emailExists) {
        return { error: new Error("Error: Email exists") };
      }
    } else if (details.matric_no) {
      //   check if user exist
      const matric_no = await User.findOne({ matric_no: details.matric_no });
      if (matric_no) {
        return { error: new Error("Error: User exists") };
      }
    }

    //   Hash password
    const hashedPassword = await bcrypt.hash(details.password, 12);

    // create user
    const user = new User({
      firstname: details.firstname,
      lastname: details.lastname,
      matric_no: details.matric_no,
      email: details.email,
      password: hashedPassword,
    });
    await user.save();
    return user;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// LOGIN
exports.loginService = async (details) => {
  try {
    const { matric_no, email, password } = details;

    if (email) {
      //   check if user exist
      const user = await User.findOne({ email: email });
      if (!user) {
        return { error: new Error("Error: Invalid credentials") };
      }

      // validate password
      const validatePassword = await bcrypt.compare(password, user.password);
      if (!validatePassword)
        return { error: new Error("Error: Invalid credentials") };

      //   Generate JWT Token
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

      return {
        user,
        token,
      };
    } else if (matric_no) {
      //   check if user exist
      const user = await User.findOne({ matric_no: matric_no });
      if (!user) {
        return { error: new Error("Error: Invalid credentials") };
      }

      // validate password
      const validatePassword = await bcrypt.compare(password, user.password);
      if (!validatePassword)
        return { error: new Error("Error: Invalid credentials.") };

      //   Generate JWT Token
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

      return {
        user,
        token,
      };
    }

    return { error: new Error("Error: Something went wrong.") };
  } catch (error) {
    return { error: new Error(error) };
  }
};

// exports.logoutService = async (details) => {
//   try {
//     req.session.destroy((err) => {
//       if (err) {
//         return {
//           error: new Error(`Error:
//         ${err}`),
//         };
//       } else {
//         return "Logout successful";
//         // res.redirect("/login"); // Redirect to the login page after logout
//       }
//     });
//   } catch (error) {
//     return { error: new Error(error) };
//   }
// };
