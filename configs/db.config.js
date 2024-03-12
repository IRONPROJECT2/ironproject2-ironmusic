const mongoose = require("mongoose");
mongoose.set('strictQuery', false);


const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ironmusic";

mongoose.connect(MONGO_URI)
  .then((x) => console.info(`Successfully connected to the database: ${x.connection.name}`))
  .catch((error) => console.error(`An error ocurred trying to connect to the database`, error));

