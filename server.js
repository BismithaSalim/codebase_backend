var express = require('express');
var app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const url = require("./model/url");

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


require("dotenv").config();

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// API to shorten long Url
app.post("/shortUrl", async (req, res) => {
    const longUrl = req.body.longurl;
    const shortUrl = generateShortUrl(longUrl);
    req.body.shortUrl=shortUrl;
    const objData = new url(req.body);
    const savedData = await objData.save();
    res.json({status:200,shortUrl:shortUrl})
  })

  function generateShortUrl(url) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        // Choose the length of the ID
        const idLength = 6;

        // Generate a random ID
        let id = '';
        for (let i = 0; i < idLength; i++) {
          const randomIndex = Math.floor(Math.random() * alphabet.length);
          id += alphabet[randomIndex];
        }
        // Build the shortened URL by combining the ID with the domain name
        const shortUrl = `https://example.com/${id}`;
        return shortUrl;
  }

  // API to redirect shortened Url to long Url
  app.post('/redirect', async (req, res) => {
    var short_url=req.body.shortUrl
    // Fetching long Url from DB
    const getUrl = await url.findOne({shortUrl:req.body.shortUrl},{longUrl:1})
    res.redirect(getUrl.longUrl);
  });

// connect to db
const URI = process.env.MONGO_URI;
console.log("URI",URI)
mongoose.connect(URI) 
.then(() => console.log("Connected to MongoDB", URI))
  .catch(err => console.error('Connection error:', err));

const db = mongoose.connection;

// Added check for DB connection
if (!db) console.log("Error connecting db");
else console.log("Db connected successfully");


// set port, listen for requests
const port = process.env.PORT || 4800;
app.listen(port, () => {
  console.log("Server is running");
});