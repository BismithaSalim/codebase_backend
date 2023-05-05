const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const urlSchema = new Schema(
  {
    
    longUrl: { type: String},
    shortUrl: { type: String },
  },
  { timestamps: true },
  {collection:"url"}
);

module.exports = mongoose.model("url", urlSchema,"url");