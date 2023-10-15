// Import dependencies
const path = require("path");
const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const schedule = require("node-schedule");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const MongoDBStoreSession = require("connect-mongodb-session")(session);

// Import Models
const User = require("./models/user.model");

// ENV Variables
const port = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

// Sessions
const storeSession = new MongoDBStoreSession({
  uri: MONGODB_URI,
  collection: "sessions",
});

// Don't ask
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(
  session({
    secret: "this is the secret of edikan",
    resave: false,
    saveUninitialized: false,
    store: storeSession,
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});

// Function to create admin user if it doesn't exist
async function createAdminUser() {
  try {
    const firstname = "admin";
    const lastname = "admin";
    const email = "admin@admin.com";
    const password = "admin";

    //   check if email exist
    const emailExists = await User.findOne({ email: email });
    if (!emailExists) {
      //   Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // create user
      const user = new User({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        role: "admin",
      });
      await user.save();
      console.log("Admin user created successfully.");
    }
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
}

// Set Routes
require("./routes/index.route")(app);

// Connect to DB and start server
mongoose
  .connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(async () => {
    console.log("***Database Connected***");

    // Call the function to create admin user
    await createAdminUser();

    app.listen(port, () => {
      console.log(`<<<Server running on ${port}>>>`);
    });
  })
  .catch((err) => console.log("Connection Error: ", err.message));
