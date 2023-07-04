const express = require('express');
const path = require('path');
const app = express();

var distDir = path.join(__dirname, '../dist');
app.use(express.static(distDir));

app.get("/", function (req, res) {
  res.sendFile(distDir + "/index.html");
});

app.listen(3000, function () {
  console.log("Server is running on localhost3000");
});