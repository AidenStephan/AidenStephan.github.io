// ----------------------------------------- VARIABLES AND SETUP ----------------------------------------
/**
 * Provides the function for the Animal Facts page on the Facts Central website.
 *
 * @type {HTMLElement} FactCentralAnimalFacts.html
 * @author astephan18@georgefox.edu
 */
// Setting up relevant variables
// Getting buttons
let homeBtn = document.getElementById("homeBtn");
let getFactBtn = document.getElementById("getFactBtn");
let uselessFactsBtn = document.getElementById("uselessFactsBtn");
let factGameBtn = document.getElementById("factsGameBtn");

// Getting properties
let screenWidth = screen.width;
let htmlRoot = document.querySelector(":root");

// Animal facts API urls
let catFactsUrl = "https://meowfacts.herokuapp.com/"
let dogFactsUrl =  "https://api.codetabs.com/v1/proxy?quest=https://dog-api.kinduff.com/api/facts";

// Set page width variable in the CSS file on page load.
htmlRoot.style.setProperty("--page-width", `${screenWidth}px`)

//------------------------------------------ EVENT LISTENERS --------------------------------------------
/**
 * Event listener to link the "Home" button to the homepage.
 */
homeBtn.addEventListener('click', () => {
   window.location = "FactCentralHome.html";
});

/**
 * Event listener to link the "Useless Facts" button to the corresponding page.
 */
uselessFactsBtn.addEventListener('click', () => {
   window.location = "FactCentralUselessFacts.html";
});

/**
 * Event listener to link the "Fact or Fiction?" button to the corresponding page.
 */
factGameBtn.addEventListener('click', () => {
   window.location = "FactCentralGame.html";
});

/**
 * Event listener to get animal facts from the appropriate API when the "get facts" button is clicked.
 */
getFactBtn.addEventListener("click", e => {
   e.preventDefault();

   // Get the animal type selected by the user.
   let animalType = document.getElementById("animalType").value;

   // Get the data from the appropriate API and call the functions to parse and display it.
   if (animalType === "cat") {
      getFact(catFactsUrl, "Object.values(receivedData)[0][0]");
   }
   else if (animalType === "dog") {
      getFact(dogFactsUrl, "Object.values(receivedData)[0][0]");
   }
});