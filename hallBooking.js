//only nodejs 
//create local json file
//create api's for create and booking rooms etc

//local file file
const fs = require('fs');

const filePath = 'path/to/file.json';

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  try {
    const jsonData = JSON.parse(data);
    console.log('File contents:', jsonData);
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
});


const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/room-booking', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create a Room Schema and Model
const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true },
  capacity: { type: Number, required: true },
  bookedDates: [{ type: Date }],
});

const Room = mongoose.model('Room', roomSchema);

// Express Middleware
app.use(express.json());

// API Endpoint to get all rooms
app.get('/api/rooms', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// API Endpoint to book a room
app.post('/api/rooms/book', async (req, res) => {
  const { roomNumber, date } = req.body;

  try {
    // Check if the room exists
    const room = await Room.findOne({ roomNumber });
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    // Check if the room is already booked for the specified date
    if (room.bookedDates.includes(date)) {
      return res.status(409).json({ error: 'Room already booked for this date' });
    }

    // Add the booking date to the room's bookedDates array
    room.bookedDates.push(date);
    await room.save();

    res.json({ message: 'Room booked successfully' });
  } catch (error) {
    console.error(error);
   
