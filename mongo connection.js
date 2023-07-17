const { MongoClient } = require('mongodb');

// MongoDB connection URL
const url = 'mongodb://localhost:27017';

// Database name
const dbName = 'your-database-name';

// Connection options (optional)
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connect to the MongoDB server
const connectDB = async () => {
  try {
    const client = await MongoClient.connect(url, options);
    const db = client.db(dbName);
    console.log('Connected to the database');
    return db;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
};

module.exports = connectDB;





const express = require('express');
const connectDB = require('./db');

const app = express();

// Connect to the MongoDB database
connectDB()
  .then((db) => {
    // Start your application logic here
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
