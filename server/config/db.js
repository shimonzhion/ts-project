const mongoose = require("mongoose");

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => console.log(`Server connected to DB port: ${process.env.PORT}`))
  .catch((error) => console.log({message:"Error connecting to DB",error: error.message}));

module.exports = mongoose.connection;