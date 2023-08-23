module.exports = (temp, country) => {
  // wrapping /.../g will make it global so all elements will be wrapped in these placeholders
  //replaceAll country name with temp because it is not good practice to directly maniumplate arguements hence let
  let output = temp.replaceAll(/{%NAME%}/g, country.name);
  output = output.replaceAll(/{%NATIVENAME%}/g, country.nativeName);
  output = output.replaceAll(/{%FLAG%}/g, country.flag);
  output = output.replaceAll(/{%POPULATION%}/g, country.population);
  output = output.replaceAll(/{%REGION%}/g, country.region);
  output = output.replaceAll(/{%SUBREGION%}/g, country.subregion);
  output = output.replaceAll(/{%CAPITAL%}/g, country.capital);
  output = output.replaceAll(/{%FLAG%}/g, country.flags.png);

  //   if (!product.organic)
  //     output = output.replaceAll(/{%NOT_ORGANIC%}/g, "not-organic");
  //   return output;
};
