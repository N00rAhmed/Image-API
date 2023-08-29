const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
require('dotenv').config(); // Load environment variables

// git rm -r --cached node_modules
// http://localhost:3000/image/64e76e4e53ead60703895ba5
// git rm .env --cached


// const config = require('./config');

const app = express();
const port = 3000;

// Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Parse JSON bodies
app.use(bodyParser.json());

app.use(cors());


// Connect to MongoDB
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Create a schema for the image model
const imageSchema = new mongoose.Schema({
  name: String,
  data: Buffer,
  contentType: String,
});

// Create the image model
const Image = mongoose.model('Image', imageSchema);

// Define the API endpoint for image upload
app.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
  
    const image = new Image();
    image.name = req.file.originalname;
    image.data = req.file.buffer;
    image.contentType = req.file.mimetype;
  
    try {
      await image.save();
      res.status(200).send('Image uploaded successfully.');
    } catch (err) {
      console.error(err);
      res.status(500).send('Failed to upload image.');
    }
  });
  
  app.get('/image/:id', async (req, res) => {
    const imageId = req.params.id;
  
    try {
      const image = await Image.findById(imageId);
      
      if (!image) {
        return res.status(404).send('Image not found.');
      }
  
      res.setHeader('Content-Type', image.contentType);
      res.send(image.data);
    } catch (err) {
      console.error(err);
      res.status(500).send('Failed to find image.');
    }
  });
  
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});