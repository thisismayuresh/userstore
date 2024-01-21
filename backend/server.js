const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 8000;
const cors = require('cors');

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/userstore');

const User = require('./Users'); 
const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});


app.post('/users', async (req, res) => {
  try {
    const { name, email, contact, gender, dob } = req.body;

    console.log(req.body);

    const user = new User({
      name,
      email,
      contact,
      gender,
      dob,
    });

    await user.save();

    res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Route to get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

app.put('/users/:id', async (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body;
  console.log(updatedUserData);

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

app.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User Not Found" });
    }

    res.status(200).json({ message: 'User deleted successfully', deletedUser });
  } catch (error) {
    console.log("Got Error", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on Port ${port}`);
});
