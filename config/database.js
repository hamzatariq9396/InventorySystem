const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then((res) => {
      console.log(`Databse Connected Successfully with ${res.connection.db.databaseName}`);
    })
    .catch((err) => console.log(err));
};

module.exports = connectDatabase;
