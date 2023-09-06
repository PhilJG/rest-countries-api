//fs = file system.acces to functions for reading and writing date to the file system
const fs = require("fs");
const replaceTemplate = require("./modules/replaceTemplate");
const express = require("express");
const bodyParser = require("body-parser");
const fetchCountry = require("./script");

const app = express();
const port = 3000;

/////////////
// SERVER

// __dirname is an environment variable that tells you the absolute path of the directory containing the currently executing file.
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempCountry = fs.readFileSync(
  `${__dirname}/templates/template-country.html`,
  "utf-8"
);

const data = (fs.readFileSync = fs.readFileSync(
  `${__dirname}/data/data.json`,
  "utf-8"
));

// Turn string into object
const dataObj = JSON.parse(data);

// Modified: Serve static files from the root directory
app.use(express.static(__dirname));

//Overview page
app.get("/", (req, res) => {
  //loop through the array and replace the template placeholders with the actual data from the current product
  const cardsHtml = dataObj.map((el) => replaceTemplate(tempCard, el)).join("");
  const output = tempOverview.replace(`{%COUNTRY_CARDS%}`, cardsHtml);
  // Modified: Use res.send instead of res.end
  res.send(output);
});

// Country page
app.get("/country", (req, res) => {
  res.send("This is a country"); // Modified: Use res.send instead of res.end
});

app.get("/data/data.json", fetchCountry); // Using the fetchCountry middleware to handle requests to /data/data.json

// Added: Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// const server = http.createServer((req, res) => {
//   const { query, pathname } = url.parse(req.url, true);

//   //Overview page
//   if (pathname === "/" || pathname === "/overview") {
//     res.writeHead(200, { "Content-type": "text/html" });

//     //loop through the array and replace the template palceholders with the actual data from the current product
//     const cardsHtml = dataObj
//       .map((el) => replaceTemplate(tempCard, el))
//       .join("");

//     const output = tempOverview.replace(`{%COUNTRY_CARDS%}`, cardsHtml);

//     res.end(output);

//     //Country page
//   } else if (pathname === "/country") {
//     res.end("This is a country");
//   } else {
//     res.writeHead(404, {
//       "Content-type": "text/html",
//       "my-own-header": "hello world",
//     });
//     res.end("<h1>Page not found!</h1>");
//   }
// });

// server.listen(8000, "127.0.0.1", () => {
//   console.log("Listening to request on port 8000");
// });
