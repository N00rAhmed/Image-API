// routes.js
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const Image = require('../models/Image');

module.exports = (app) => {
  // API endpoint for image upload
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

  // API endpoint for image retrieval
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
};
