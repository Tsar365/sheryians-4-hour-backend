const mongoose = require('mongoose');

const connection=mongoose.connect('mongodb://localhost:27017/backend4hours')
.then(()=>{
  console.log("connected to db");
})

module.exports = connection;