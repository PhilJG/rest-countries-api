// Create a client-side file (e.g., client.js) that handles the client-side logic and interacts with the server-side endpoints.
// Move the client-side code from the combined code you provided into the client.js file. This code will handle the client-side functionality, such as handling the dropdown selection and making requests to the server-side endpoints.
// In the client-side code, update the event listener to make an HTTP request to the server-side endpoint instead of logging the selected region to the console.

const regionSelect = document.getElementById("regionSelect");

regionSelect.addEventListener("change", handleDropdownSelection);

function handleDropdownSelection() {
  const selectedRegion = regionSelect.value;

  // Make an HTTP request to the server-side endpoint
  fetch(`/countries?region=${selectedRegion}`)
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the server
      console.log("Filtered country list:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// The client-side code handles the dropdown selection event and makes an HTTP request to the server-side endpoint using the fetch API. The response from the server is then logged to the console.
