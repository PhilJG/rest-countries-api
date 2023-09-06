//
// Create a server-side file (e.g., server.js) that handles the server-side logic and exposes endpoints for client-side communication.
// Move the server-side code from the combined code you provided into the server.js file. This code will handle the server-side functionality, such as reading the data file and sending the filtered country list.

const express = require("express");
const fs = require("fs");

const app = express();
const port = 3000;

app.get("/countries", function (req, res) {
  const region = req.query.region;
  const dataFilePath = __dirname + "/data/data.json";
  const countryList = [];

  let rawdata = fs.readFileSync(dataFilePath);
  let data = JSON.parse(rawdata);

  data.forEach(function (country) {
    if (country.region === region) {
      countryList.push(country.name);
    }
  });

  res.send(countryList);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
