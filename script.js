//Modify the script.js and transform it into an Express.js middleware. Here, we're essentially making this middleware to take the place of the fetchCountry function and serve data to /data/data.json route:
const fs = require("fs");

module.exports = function (req, res, next) {
  const region = req.query.region; // changes this.value to req.query.region, to pull the region from the request query string};
  const dataFilePath = __dirname + "/data/data.json"; //not required to adjust the path to the JSON data file, Express.js handles it automatically
  const countryList = [];

  let rawdata = fs.readFileSync(dataFilePath); //reading the file synchronously
  let data = JSON.parse(rawdata); //parsing the read data

  // Loop through the data and display countries of the selected region
  data.forEach(function (country) {
    if (country.region === region) {
      countryList.push(country.name);
    }
  });

  res.send(countryList);
};

// const fetchCountry = function () {
//   var region = this.value;

//   // Make an AJAX request to fetch the JSON data file
//   var xhr = new XMLHttpRequest();
//   xhr.open("GET", "/data/data.json", true); // Adjusted the path to the JSON data file
//   xhr.onload = function () {
//     if (xhr.status === 200) {
//       var data = JSON.parse(xhr.responseText);
//       var countryList = document.getElementById("countryList");
//       countryList.innerHTML = "";

//       // Loop through the data and display countries of the selected region
//       data.forEach(function (country) {
//         if (country.region === region) {
//           var countryName = country.name;
//           var countryElement = document.createElement("p");
//           countryElement.textContent = countryName;
//           countryList.appendChild(countryElement);
//         }
//       });
//     }
//   };
//   xhr.send();
// };

// document
//   .getElementById("regionSelect")
//   .addEventListener("change", fetchCountry());
