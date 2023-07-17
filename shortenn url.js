// npm install express mongoose shortid

const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid'); // this is important package

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/url-shortener', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create a URL Schema and Model
const urlSchema = new mongoose.Schema({
  fullUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, default: shortid.generate }
});

const Url = mongoose.model('Url', urlSchema);

// Express Middleware
app.use(express.json());

// API Endpoint to Create a Short URL
app.post('/api/url/shorten', async (req, res) => {
  const { fullUrl } = req.body;

  try {
    // Check if the URL already exists in the database
    let url = await Url.findOne({ fullUrl });
    if (url) {
      res.json(url);
    } else {
      // Create a new URL document and save it to the database
      url = new Url({ fullUrl });
      await url.save();
      res.json(url);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
