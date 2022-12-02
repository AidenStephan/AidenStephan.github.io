// ----------------------------------------- VARIABLES AND SETUP ----------------------------------------
/**
 * Provides the function for the "Useless Facts" page of my Fact Central webpage.
 *
 * @type {HTMLElement} FactCentralUselessFacts.html
 * @author astephan18@georgefox.edu
 */
// Getting buttons
let homeBtn = document.getElementById("homeBtn");
let animalFactsBtn = document.getElementById("animalFactsBtn");
let factsGameBtn = document.getElementById("factsGameBtn");
let getFactBtn = document.getElementById("getFactBtn");

// Getting properties
let screenWidth = screen.width;
let htmlRoot = document.querySelector(":root");

// Animal facts API urls
let uselessFactsUrl = "https://uselessfacts.jsph.pl/random.json?language="

// Set page width variable in the CSS file on page load.
htmlRoot.style.setProperty("--page-width", `${screenWidth}px`)

//------------------------------------------ EVENT LISTENERS --------------------------------------------
/**
 * Event listener to link the "Home" button to the homepage.
 */
homeBtn.addEventListener('click', () => {
    window.location = "FactCentralHome.html";
    console.log("we're in");
});

/**
 * Event listener to link the "Animal Facts" button to the homepage.
 */
animalFactsBtn.addEventListener('click', () => {
    window.location = "FactCentralAnimalFacts.html";
});

/**
 * Event listener to link the "Fact or Fiction?" button to the homepage.
 */
factsGameBtn.addEventListener('click', () => {
    window.location = "FactCentralGame.html";
});

/**
 * Event listener to get animal facts from the appropriate API when the "get facts" button is clicked.
 */
getFactBtn.addEventListener("click", e => {
    e.preventDefault();

    // Get the animal type selected by the user.
    let language = document.getElementById("language").value;

    // Get the data from the appropriate API, parse the fact, and display it.
    if (language === "en") {
        getFact(`${uselessFactsUrl}en`, "Object.values(receivedData)[1]");
    }
    else if (language === "de") {
        getFact(`${uselessFactsUrl}de`, "Object.values(receivedData)[1]");
    }
});