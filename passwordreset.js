// npm install express mongoose nodemailer crypto

const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/password-reset', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create a User Schema and Model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  resetToken: String,
  resetTokenExpiration: Date
});

const User = mongoose.model('User', userSchema);

// Express Middleware
app.use(express.json());

// API Endpoint to initiate password reset
app.post('/api/reset-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate reset token and expiration
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour

    // Update user's reset token and expiration in the database
    user.resetToken = resetToken;
    user.resetTokenExpiration = resetTokenExpiration;
    await user.save();

    // Send password reset email to the user
    const transporter = nodemailer.createTransport({
      // Configure your email provider here
      // See nodemailer documentation for details
    });

    const mailOptions = {
      from: 'your-email@example.com',
      to: email,
      subject: 'Password Reset',
      text: `To reset your password, click the following link: ${resetToken}`
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



//React app

import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the backend API to initiate password reset
      await axios.post('/api/reset-password', { email });
      setMessage('Password reset email sent');
    } catch (error) {
      console.error(error);
      setMessage('Error: Could not send password reset email');
    }
  };

  return (
    <div>
      <h1>Password Reset</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
