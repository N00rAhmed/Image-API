<h2>API Information</h2>

This API can add images and send them to a MongoDB database. Using the ```/image/id``` search param you can search for your images by their ID and have the image rendered infront of you. 

<!-- <br/> -->
<h3>Tech Stack:</h3>
Node.js | Express.js | MongoDB/Mongoose | Postman


<h3>Article Link</h3>
Here is an article for more information about the source code: https://noor-ahmed.hashnode.dev/create-and-deploy-image-api

<h3>TroubleShooting</h3>

When running this application locally you may get this error:
```
RangeError: offset is out of boundsat Buffer.set at serializeBinary \lib\bson
```

This is because the Buffer offset range has a filesize limit when uploading to mongodb. Multer is used to store the file in memory using `multer.memoryStorage()`. This allows us to use Buffer which is used to temporarily store the file in memory(RAM) and handles all the raw binary data from the file. MongoDB uses BSON(binary json) to store data and the maximum size for a single BSON document in MongoDB is 16MB. A workaround to this problem is to use <a href="https://www.mongodb.com/docs/manual/core/gridfs/">GridFS</a> instead of Multer.

GridFS is a MongoDB tool used for storing and retrieving files that are larger than the BSON document size limit(16MB). This is done by seperating a large file into smaller chunks and stores each chunk as a seperate document.

<h3>API Links</h3>

```
https://image-api-f8qs.onrender.com
```

<h3>Upload An Image</h3>

```
https://image-api-f8qs.onrender.com/upload
```
Use Postman for adding images or any other API service.
<br/>

<img src="./images/postman.png"/>

<!-- <br/> -->
<h3>Search for an Image</h3>

```
https://image-api-f8qs.onrender.com/image/id
```

<h3>ID's to search through</h3>

```
64e76e4e53ead60703895ba5
```

```
64e76f7e6fbe37fb8474d93b
```

```
64edba179a581d5a79deec98
```

```
64edbaab9a581d5a79deec9b
```

<h3>Cool Tiktok Sounds</h3>

```
664655f27ad5ac4ba5177b85
```

```
66477d571117960956372a36
```

```
66477d881117960956372a38
```

<h3>PDF'S</h3>

```
6649f21da6756d4843d9ddcc
```

```
6649f384a6756d4843d9ddcf
```

<h3>Install Dependencies</h3>

```
npm install
```

<h3>Run Node API</h3>
First remember to cd into your directory and then write this command:

```
nodemon app.js
```

<h3>Hosting Service:</h3>
Currently the API is being hosted using onrender which is a free hosting service: https://render.com. If you want to host it yourself or if you want to make some changes to the API then here I will discuss a few things you will need to know.

<h3>Deploy API</h3>
All of the steps for deployment can be found in this video: https://www.youtube.com/watch?v=bnCOyGaSe84&ab_channel=CodeBrah

<h3>Deploy API with hidden .env or config.js file</h3>
In order to deploy the API to onrender with a hidden .env you can follow this tutorial, go to 16:24 in the tutorial: https://www.youtube.com/watch?v=68ubggfsQlE

<br/>
<br/>
If you have a hidden config.js file or any other named file with the mongodb uri then on render.com when you go on environment, navigate to Secret Files and fill in the details for your config.js file there instead of environment variables:

<br/>
<br/>
<img src="./images/example.png"/>
<!-- <br /> -->
<br />

Please make sure to setup a MongoDB cluster before you use this API. Here is an informative tutorial on how you can do this: https://www.youtube.com/watch?v=s0anSjEeua8&ab_channel=TheNetNinja

<!-- <br /> -->


<h3>Resources</h3>

https://www.npmjs.com/package/multer
https://adityabverma.hashnode.dev/maximizing-multer-advanced-configuration-and-tips-for-powerful-file-uploads
https://stackoverflow.com/questions/62129964/how-to-set-buffer-offset-range-in-mongodb-its-not-allowing-to-upload-more-than
https://www.mongodb.com/docs/manual/core/gridfs/
https://stackoverflow.com/questions/16482233/store-file-in-mongos-gridfs-with-expressjs-after-upload
https://www.mongodb.com/docs/drivers/node/current/crud/gridfs/