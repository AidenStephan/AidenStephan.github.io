// ----------------------------------------- VARIABLES AND SETUP ----------------------------------------
/**
 * Provides the function for the "Useless Facts" page of my Fact Central webpage.
 *
 * @type {any[]} FactCentralUselessFacts.html
 * @author astephan18@georgefox.edu
 */
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
let titleTile = document.getElementById("titleTile");
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
        fadeIn(gameStartBtn, 250);
    });
    fadeOut(gameText[0], 250);
    fadeOut(gameText[1], 250);
    fadeOut(gameText[2], 250);
    fadeOut(gameTrueBtn, 250);
    fadeOut(gameFalseBtn, 250);

    gameText[0].getAnimations()[0].finished.then(() => {
        fadeOut(gameContainer, 750);
        stretchHeight(gameContainer, gameContainer.style.height, "0px", 500);
        stretchWidth(gameContainer, gameContainer.style.width, "0px", 500);
        gameContainer.getAnimations()[0].finished.then(() => {
            stretchHeight(titleTile,
                `${titleTile.offsetHeight}px`,
                `${titleTile.offsetHeight - 150}px`,
                750);
        });
    });
    factIndex = 0;
    correctCount = 0;
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
        stretchHeight(gameContainer, gameContainer.style.height, "50%", 500);
        stretchWidth(gameContainer, gameContainer.style.width, "150%", 500);
        gameContainer.getAnimations()[0].finished.then(() => {
            fadeIn(gameText[0], 250);
            fadeIn(gameText[1], 250);
            fadeIn(gameText[2], 250);
            fadeIn(gameTrueBtn, 250);
            fadeIn(gameFalseBtn, 250);
        });
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
    for (let text of gameText) {
        fadeOut(text, 250);
    }
    fadeOut(gameTrueBtn);
    fadeOut(gameFalseBtn);
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
        fadeIn(gameText[3], 250);
        fadeIn(gameText[4], 250);
    }
    else if (currentFact.answer === "True") {
        gameText[3].innerHTML = "True.";
        gameText[4].innerHTML = "Well done!";
        fadeIn(gameText[3], 250);
        fadeIn(gameText[4], 250);
        correctCount ++;
    }
    gameTrueBtn.disabled = true;
    gameFalseBtn.disabled = true;
    fadeIn(gameNextBtn, 250);
});

gameFalseBtn.addEventListener("click", () => {
    if (currentFact.answer === "False") {
        gameText[3].innerHTML = "Correct! This is false.";
        gameText[4].innerHTML = currentFact.explanation;
        fadeIn(gameText[3], 250);
        fadeIn(gameText[4], 250);
        correctCount ++;
    }
    else if (currentFact.answer === "True") {
        gameText[3].innerHTML = "Incorrect. This is a true fact.";
        fadeIn(gameText[3], 250);
        fadeIn(gameText[4], 250);
    }
    gameTrueBtn.disabled = true;
    gameFalseBtn.disabled = true;
    fadeIn(gameNextBtn, 250);
});

gameNextBtn.addEventListener("click", () => {
    playGame();
    gameTrueBtn.disabled = false;
    gameFalseBtn.disabled = false;
    fadeOut(gameNextBtn, 250);
    fadeOut(gameText[3], 250);
    fadeOut(gameText[4], 250);
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