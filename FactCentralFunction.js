// ----------------------------------------- VARIABLES AND SETUP ----------------------------------------
/**
 * Provides the function for the "Home" page of my Fact Central webpage.
 *
 * @type {HTMLElement} FactCentralHome.html
 * @author astephan18@georgefox.edu
 */
// Getting buttons
let animalFactsBtn = document.getElementById("animalFactsBtn");
let uselessFactsBtn = document.getElementById("uselessFactsBtn");
let factsGameBtn = document.getElementById("factsGameBtn");
let btnsArray = [animalFactsBtn, uselessFactsBtn, factsGameBtn];

// Getting tiles
let animalFactsTile = document.getElementById("animalFactsTile");
let uselessFactsTile = document.getElementById("uselessFactsTile")
let factsGameTile = document.getElementById("factsGameTile");
let tilesArray = [animalFactsTile, uselessFactsTile, factsGameTile];

// Getting document properties
let screenWidth = screen.width;
let htmlRoot = document.querySelector(":root");

// Setting the page width to update in the style sheet when the page size is changed.
htmlRoot.style.setProperty("--page-width", `${screenWidth}px`)
updatePageWidth();


//-------------------------------------------- FUNCTIONS ------------------------------------------------
/**
 * Function to update the page width in the CSS stylesheet every time the page is resized.
 * This allows for dynamic resizing of the tile height to fit the text.
 */
function updatePageWidth() {
    htmlRoot.style.setProperty("--page-width", String(window.innerWidth));
}

/**
 * Display an option tile with text and highlight the associated button when there is a hover event.
 *
 * @param index The index in the button and tile arrays (declared above) where the relevant
 *              button and tile are.
 */
function displayTile(index) {
    btnsArray[index].classList.add("btnHover");
    document.getElementsByClassName("navTileText")[index].style.display = "block";
    tilesArray[index].style.cursor = "pointer";
}

/**
 * Hide an option tile and its text, then de-highlight the associated button when the user is
 * no longer hovering over the tile.
 *
 * @param index The index in the button and tile arrays (declared above) where the relevant
 *              button and tile are.
 */
function hideTile(index) {
    btnsArray[index].classList.remove('btnHover');
    document.getElementsByClassName("navTileText")[index].style.display = "none";
}


//------------------------------------------ EVENT LISTENERS --------------------------------------------
/**
 * For loop to add event listeners for mouseover and mouseout on each of the link button/tiles.
 */
for (let i = 0; i < 3; i++) {
    tilesArray[i].addEventListener('mouseover', () => {displayTile(i)});
    tilesArray[i].addEventListener('mouseout', () => {hideTile(i)});
}

/**
 * Listener to update page width in the stylesheet every time the page is resized.
 */
onresize = () => {
    updatePageWidth();
};
