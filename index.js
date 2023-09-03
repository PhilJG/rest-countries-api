//fs = file system.acces to functions for reading and writing date to the file system
const fs = require("fs");
const http = require("http");
const url = require("url");
// const replaceTemplate = require("./modules/replaceTemplate");

/////////////
// SERVER
const replaceTemplate = (temp, country) => {
  let output = temp.replaceAll(/{%NAME%}/g, country.name);
  output = output.replaceAll(/{%NATIVENAME%}/g, country.nativeName);
  output = output.replaceAll(/{%FLAG%}/g, country.flag);
  output = output.replaceAll(/{%POPULATION%}/g, country.population);
  output = output.replaceAll(/{%REGION%}/g, country.region);
  output = output.replaceAll(/{%SUBREGION%}/g, country.subregion);
  output = output.replaceAll(/{%CAPITAL%}/g, country.capital);
  output = output.replaceAll(/{%FLAG%}/g, country.flag);

  return output;
};

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

const dataObj = JSON.parse(data);

const searchRegion = function (region, data) {
  if (region == data.region) {
    const output = tempOverview.replace(`{%COUNTRY_CARDS%}`, cardsHtml);
  }
};

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //Overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    //loop through the array and replace the template palceholders with the actual data from the current product
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");

    const output = tempOverview.replace(`{%COUNTRY_CARDS%}`, cardsHtml);

    res.end(output);

    //Country page
  } else if (pathname === "/country") {
    res.end("This is a country");
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello world",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on port 8000");
});
