const mongoose = require("mongoose");

mongoose
  .connect(process.env.CONSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("Connected to the database..!!");
  })
  .catch((err) => {
    console.log(`Error::${err}`);
  });
