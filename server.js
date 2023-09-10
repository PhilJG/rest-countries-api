//
// Create a server-side file (e.g., server.js) that handles the server-side logic and exposes endpoints for client-side communication.
// Move the server-side code from the combined code you provided into the server.js file. This code will handle the server-side functionality, such as reading the data file and sending the filtered country list.
//In the server-side code, update the endpoint to receive the region from the request query string and send the filtered country list as the response.

const fs = require("fs");
const express = require("express");

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

// In this example, the server-side code is responsible for handling the /countries endpoint, which receives the region from the request query string and sends the filtered country list as the response.
