// db.js

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;

// const MONGO_URI = 'mongodb://localhost:27017/artint'; // Replace with your MongoDB connection string
const MONGO_URI = process.env.DB; // Replace with your MongoDB connection string
mongoose.connect(MONGO_URI);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`Error connecting to MongoDB: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Connection closed due to application termination');
    process.exit(0);
  });
});

module.exports = mongoose;
