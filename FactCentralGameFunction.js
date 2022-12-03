// ----------------------------------------- VARIABLES AND SETUP ----------------------------------------
/**
 * Provides the function for the "Useless Facts" page of my Fact Central webpage.
 *
 * Uses Chart.js library to display game results.
 *
 * @type {any[]} FactCentralUselessFacts.html
 * @author astephan18@georgefox.edu
 */

// import Chart from "chart.js/auto";

let falseFactsData;
let trueFactsData;
let factIndex = 0;
let correctCount = 0;

// Getting buttons
let homeBtn = document.getElementById("homeBtn");
let animalFactsBtn = document.getElementById("animalFactsBtn");
let uselessFactsBtn = document.getElementById("uselessFactsBtn");
let gameStartBtn = document.getElementById("gameStartBtn");
let gameResetBtn = document.getElementById("gameResetBtn");
let gameTrueBtn = document.getElementById("gameTrueBtn");
let gameFalseBtn = document.getElementById("gameFalseBtn");
let gameNextBtn = document.getElementById("gameNextBtn");
let gameText = document.getElementsByClassName("gameText");
// let getFactBtn = document.getElementById("getFactBtn");

let falseFactsUrl = "FactCentralFalseFacts.txt";
let trueFactsUrl = "https://api.api-ninjas.com/v1/facts?limit=20";
let trueFactsApiKey = {headers: { 'X-Api-Key': '9YyytL8gs2AWjPg75vHpPQ==cCNa5FtJq7qLHWa4'}};

// Getting other elements
let gameContainer = document.getElementById("gameContainer");
let currentFact;

// Getting properties
let screenWidth = screen.width;
let htmlRoot = document.querySelector(":root");

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

async function fetchFile(url, details) {
    let data;

    // Fetch data from API at url.
    let response = await fetch(url, details);
    if (response.ok) {
        data = await response.json();
    } else {
        data = false;
    }

    return data;
}

function getRandomFact() {
    let factData;
    let falseOrTrue = Math.random() < 0.5;

    if (falseOrTrue) {
        factData = {"text": trueFactsData[factIndex].fact, "answer": "True", "explanation": ""};
    }
    else {
        factData = falseFactsData[factIndex];
    }
    factIndex ++;

    return factData;
}

function resetGame() {
    fadeOut(gameResetBtn, 250);
    gameResetBtn.getAnimations()[0].finished.then(() => {
        fadeIn(gameStartBtn, 250, "block");
    });
    fadeOut(gameText[0], 250);
    fadeOut(gameText[1], 250);
    fadeOut(gameText[2], 250);
    fadeOut(gameText[3], 250);
    fadeOut(gameText[4], 250);
    fadeOut(gameTrueBtn, 250);
    fadeOut(gameFalseBtn, 250);

    gameText[3].innerHTML = ""
    gameText[4].innerHTML = ""

    gameText[0].getAnimations()[0].finished.then(() => {
        fadeOut(gameContainer, 750);
        gameContainer.style.padding = "0";
        stretchHeight(gameContainer, gameContainer.style.height, "0px", 500);
        stretchWidth(gameContainer, gameContainer.style.width, "0px", 500);
    });
    factIndex = 0;
    correctCount = 0;
}

function startGame() {
    fadeOut(gameStartBtn, 250);
    gameStartBtn.getAnimations()[0].finished.then(() => {
        fadeIn(gameResetBtn, 250, "block");
    });

    fadeIn(gameContainer, 750, "block");
    stretchHeight(gameContainer, 0, "25vh", 500);
    stretchWidth(gameContainer, 0, "95.5%", 1000);
    gameContainer.style.padding = "2vw";

    Promise.all(gameContainer.getAnimations().map((animation) => animation.finished)).then(() => {
        fadeIn(gameText[0], 250, "block");
        fadeIn(gameText[1], 250, "block");
        fadeIn(gameText[2], 250, "block");
        fadeIn(gameTrueBtn, 250, "inline-block");
        fadeIn(gameFalseBtn, 250, "inline-block");
    });

    fetchFile(falseFactsUrl).then((receivedData) => {
        falseFactsData = Object.values(receivedData).sort((a, b) => 0.5 - Math.random());
        return fetchFile(trueFactsUrl, trueFactsApiKey);
    }).then((factsData) => {
        trueFactsData = Object.values(factsData);
        playGame();
    });
}

function displayResults() {
    factIndex = 0;
    fadeOut(gameText[0], 250);
    fadeOut(gameText[1], 250)
    fadeOut(gameTrueBtn);
    fadeOut(gameFalseBtn);
    fadeOut(gameNextBtn);

    gameText[2].innerHTML = "Result:";
    gameText[3].innerHTML = String(100 * correctCount/10) + "%";
    if (correctCount < 7) {
        gameText[4].innerHTML = "Better luck next time.";
    }
    else {
        gameText[4].innerHTML = "Good work!";
    }
}

function playGame() {
    if (factIndex < 10) {
        gameText[0].children[0].innerHTML = String(factIndex + 1);
        currentFact = getRandomFact();
        gameText[1].innerHTML = currentFact.text;
    }
    else {
        displayResults();
    }
}

gameTrueBtn.addEventListener("click", () => {
    if (currentFact.answer === "False") {
        gameText[3].innerHTML = 'Incorrect. This is false.';
        gameText[4].innerHTML = currentFact.explanation;
        fadeIn(gameText[3], 250, "block");
        fadeIn(gameText[4], 250, "block");
    }
    else if (currentFact.answer === "True") {
        gameText[3].innerHTML = "True.";
        gameText[4].innerHTML = "Well done!";
        fadeIn(gameText[3], 250, "block");
        fadeIn(gameText[4], 250, "block");
        correctCount ++;
    }
    gameTrueBtn.disabled = true;
    gameFalseBtn.disabled = true;
    fadeIn(gameNextBtn, 250, "inline-block");
});

gameFalseBtn.addEventListener("click", () => {
    if (currentFact.answer === "False") {
        gameText[3].innerHTML = "Correct! This is false.";
        gameText[4].innerHTML = currentFact.explanation;
        fadeIn(gameText[3], 250, "block");
        fadeIn(gameText[4], 250, "block");
        correctCount ++;
    }
    else if (currentFact.answer === "True") {
        gameText[3].innerHTML = "Incorrect. This is a true fact.";
        gameText[4].innerHTML = "Better luck next time :(";
        fadeIn(gameText[3], 250, "block");
        fadeIn(gameText[4], 250, "block");
    }
    gameTrueBtn.disabled = true;
    gameFalseBtn.disabled = true;
    fadeIn(gameNextBtn, 250, "inline-block");
});

gameNextBtn.addEventListener("click", () => {
    fadeOut(gameNextBtn, 250);
    gameTrueBtn.disabled = false;
    gameFalseBtn.disabled = false;
    if (factIndex < 10) {
        playGame();
        fadeOut(gameText[3], 250);
        fadeOut(gameText[4], 250);
    }
    else {
        displayResults();
    }
});

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

function fadeIn(element, duration, displayType) {
    element.style.display = displayType;

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

gameStartBtn.addEventListener('click', () => startGame());

gameResetBtn.addEventListener('click', () => resetGame());






















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