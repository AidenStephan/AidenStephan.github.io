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
let uselessFactsBtn = document.getElementById("uselessFactsBtn");
let gameStartBtn = document.getElementById("gameStartBtn");
let gameResetBtn = document.getElementById("gameResetBtn");
let titleTile = document.getElementById("titleTile");
// let getFactBtn = document.getElementById("getFactBtn");

// Getting other elements
let gameContainer = document.getElementById("gameContainer");

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
uselessFactsBtn.addEventListener('click', () => {
    window.location = "FactCentralUselessFacts.html";
});

async function fetchFromAPI(url) {
    let data;

    // Fetch data from API at url.
    let response = await fetch(url);
    if (response.ok) {
        data = await response.json();
    } else {
        data = false;
    }

    return data;
}


function getFile() {
    fetchFromAPI("FactCentralFalseFacts.txt").then((receivedData) => {
        console.log(receivedData);
    });
}

function startGame() {
    fadeOut(gameStartBtn, 250);
    gameStartBtn.getAnimations()[0].finished.then(() => {
        fadeIn(gameResetBtn, 250);
    });
    stretchHeight(titleTile,
        `${titleTile.offsetHeight}px`,
        `${titleTile.offsetHeight + 150}px`,
        750);
    titleTile.getAnimations()[0].finished.then(() => {
        fadeIn(gameContainer, 750);
        stretchHeight(gameContainer, gameContainer.style.height, "39%", 500);
        stretchWidth(gameContainer, gameContainer.style.width, "100%", 500);
    });
    // TODO: add true and false buttons.

    playGame();
}

function playGame() {
    getFile();
    // getFalseFact();
}

function stretchWidth(element, startWidth, endWidth, duration) {
    const widthFrames = [
        { width: startWidth },
        { width: endWidth }
    ];
    const widthTiming = {
        duration: duration,
        iterations: 1,
    }
    element.animate(widthFrames, widthTiming).finished.then(() => {
        element.style.width = endWidth;
    });
}

function stretchHeight(element, startHeight, endHeight, duration) {
    const heightFrames = [
        { height: startHeight },
        { height: endHeight }
    ];
    const heightTiming = {
        duration: duration,
        iterations: 1,
    }
    element.animate(heightFrames, heightTiming).finished.then(() => {
        element.style.height = endHeight;
    });
}

function fadeOut(element, duration) {
    const fadeOutFrames = [
        { opacity: 1 },
        { opacity: 0}
    ];
    const fadeOutTiming = {
        duration: duration,
        iterations: 1,
    }

    element.animate(fadeOutFrames, fadeOutTiming).finished.then(() => {
        element.style.display = "none";
    });
}

function fadeIn(element, duration) {
    element.style.display = "block";

    const fadeInFrames = [
        { opacity: 0 },
        { opacity: 1 }
    ];
    const fadeInTiming = {
        duration: duration,
        iterations: 1,
    }

    element.animate(fadeInFrames, fadeInTiming);
}













// function fadeOut(element, speed) {
//     let animation = null;
//     let opacity = 1;
//
//     clearInterval(animation);
//
//     animation = setInterval(() => {
//         if (opacity < 0.0001) {
//             clearInterval(animation);
//         }
//         else {
//             opacity -= 0.01;
//             element.style.opacity = opacity;
//         }
//     }, speed);
//
//     Promise.all(element.getAnimations().map((animation) => animation.finished)).then(
//         () => element.remove()
//     );
//
//     animation.finished.then(() => console.log("HI"));
//
//     // element.getAnimations()[0].finished.then(
//     //     () => element.style.display = "none"
//     // );
// }










gameStartBtn.addEventListener('click', () => {startGame()});






















// /**
//  * Event listener to get animal facts from the appropriate API when the "get facts" button is clicked.
//  */
// getFactBtn.addEventListener("click", e => {
//     e.preventDefault();
//
//     // Get the animal type selected by the user.
//     let language = document.getElementById("language").value;
//
//     // Get the data from the appropriate API, parse the fact, and display it.
//     if (language === "en") {
//         getFact(`${uselessFactsUrl}en`, "Object.values(receivedData)[1]");
//     }
//     else if (language === "de") {
//         getFact(`${uselessFactsUrl}de`, "Object.values(receivedData)[1]");
//     }
// });