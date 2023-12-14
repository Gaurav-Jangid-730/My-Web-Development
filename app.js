const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public')); // Assuming HTML/CSS in a 'public' folder

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/admin', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a schema for user data
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

// Create a model for the "users" collection in the "admin" database
const User = mongoose.model('User', userSchema, 'users');

// Async function to handle user registration
async function registerUser(req, res) {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    await newUser.save();
    res.send('User registered successfully');
  } catch (err) {
    res.send('Error registering user');
  }
}

// Express route handler for user registration
app.post('/register', async (req, res) => {
  await registerUser(req, res);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
