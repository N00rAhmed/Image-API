const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
require('dotenv').config(); // Load environment variables

const app = express();
const port = 3000;

// git rm -r --cached node_modules
// http://localhost:3000/image/64e76e4e53ead60703895ba5
// 64e76f7e6fbe37fb8474d93b
// git rm .env --cached
// git rm filename


// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Routes
require('./Routes/routes')(app);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
