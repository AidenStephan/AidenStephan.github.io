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
// Variables to hold facts from API
let falseFactsData;
let trueFactsData;

// Variable to count the number of facts shown in a game.
let factIndex = 0;

// Variable to count the number of correct guesses from the user.
let correctCount = 0;

// Getting buttons.
let homeBtn = document.getElementById("homeBtn");
let animalFactsBtn = document.getElementById("animalFactsBtn");
let uselessFactsBtn = document.getElementById("uselessFactsBtn");
let gameStartBtn = document.getElementById("gameStartBtn");
let gameResetBtn = document.getElementById("gameResetBtn");
let gameTrueBtn = document.getElementById("gameTrueBtn");
let gameFalseBtn = document.getElementById("gameFalseBtn");
let gameNextBtn = document.getElementById("gameNextBtn");

// Getting the game text.
let gameText = document.getElementsByClassName("gameText");

// URLs
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

//------------------------------------------ FUNCTIONS --------------------------------------------
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

/**
 * Function to fetch from an API at the input URL
 *
 * @param url The URL of the relevant API
 * @param details The details that accompany the API link (such as headers, etc.)
 * @returns {Promise<boolean>} A promise that is fulfilled when the API data is returned.
 * @returns The data received from the API.
 */
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

/**
 * Function to get a random true or false fact.
 *
 * @returns {{answer: string, text: *, explanation: string}} Object containing the random fact, its state as true
 *                                                          or false, and, if one exists, an explanation of the answer.
 */
function getRandomFact() {
    let factData;
    // Randomly pick between true fact and false fact.
    let falseOrTrue = Math.random() < 0.5;

    // If a fake fact, get it from the local file.
    if (falseOrTrue) {
        factData = {"text": trueFactsData[factIndex].fact, "answer": "True", "explanation": ""};
    }
    // If a true fact, get it from the API.
    else {
        factData = falseFactsData[factIndex];
    }
    factIndex ++;

    return factData;
}

/**
 * Resets the facts guessing game.
 */
function resetGame() {
    // Replaces the reset button with the start button.
    fadeOut(gameResetBtn, 250);
    gameResetBtn.getAnimations()[0].finished.then(() => {
        fadeIn(gameStartBtn, 250, "block");
    });

    // Fade out all inner game elements.
    fadeOut(gameText[0], 250);
    fadeOut(gameText[1], 250);
    fadeOut(gameText[2], 250);
    fadeOut(gameText[3], 250);
    fadeOut(gameText[4], 250);
    fadeOut(gameTrueBtn, 250);
    fadeOut(gameFalseBtn, 250);

    // Resets the text elements.
    gameText[3].innerHTML = ""
    gameText[4].innerHTML = ""

    // Close the game background window.
    gameText[0].getAnimations()[0].finished.then(() => {
        fadeOut(gameContainer, 750);
        gameContainer.style.padding = "0";
        stretchHeight(gameContainer, gameContainer.style.height, "0px", 500);
        stretchWidth(gameContainer, gameContainer.style.width, "0px", 500);
    });

    // Reset the variables holding the number of facts shown in game and the number of correct guesses.
    factIndex = 0;
    correctCount = 0;
}

/**
 * Starts the facts guessing game
 */
function startGame() {
    // Replaces the start button with the reset button.
    fadeOut(gameStartBtn, 250);
    gameStartBtn.getAnimations()[0].finished.then(() => {
        fadeIn(gameResetBtn, 250, "block");
    });

    // Fades in and stretches the game container.
    fadeIn(gameContainer, 750, "block");
    stretchHeight(gameContainer, 0, "25vh", 500);
    stretchWidth(gameContainer, 0, "95.5%", 1000);
    gameContainer.style.padding = "2vw";

    // Upon completion of the game container animation, fade in all inner elements.
    Promise.all(gameContainer.getAnimations().map((animation) => animation.finished)).then(() => {
        fadeIn(gameText[0], 250, "block");
        fadeIn(gameText[1], 250, "block");
        fadeIn(gameText[2], 250, "block");
        fadeIn(gameTrueBtn, 250, "inline-block");
        fadeIn(gameFalseBtn, 250, "inline-block");
    });

    // Fetch a list of false facts and a list of true facts and save them internally.
    fetchFile(falseFactsUrl).then((receivedData) => {
        falseFactsData = Object.values(receivedData).sort((a, b) => 0.5 - Math.random());
        return fetchFile(trueFactsUrl, trueFactsApiKey);
    }).then((factsData) => {
        trueFactsData = Object.values(factsData);
        playGame();
    });
}

/**
 * Displays the game results.
 */
function displayResults() {
    // Fades out inner game elements.
    fadeOut(gameText[0], 250);
    fadeOut(gameText[1], 250)
    fadeOut(gameTrueBtn);
    fadeOut(gameFalseBtn);
    fadeOut(gameNextBtn);

    // Changes the remaining inner text to display the game results.
    gameText[2].innerHTML = "Result:";
    gameText[3].innerHTML = String(100 * correctCount/10) + "%";

    // Displays "success" message if a score above 70% is achieved. Otherwise, a "try again" message is shown.
    if (correctCount < 7) {
        gameText[4].innerHTML = "Better luck next time.";
    }
    else {
        gameText[4].innerHTML = "Good work!";
    }
}

/**
 * "Plays" the game by displaying a new fact for each turn.
 */
function playGame() {
    // If less than ten facts have been displayed and responded to, continue playing.
    if (factIndex < 10) {
        gameText[0].children[0].innerHTML = String(factIndex + 1);
        currentFact = getRandomFact();
        gameText[1].innerHTML = currentFact.text;
    }
    // Otherwise, return results.
    else {
        displayResults();
    }
}

/**
 * Guesses the current fact on the screen is true.
 */
function guessTrue() {
    // If the guess is incorrect, display "incorrect" message to user and, if one exists, display the explanation.
    if (currentFact.answer === "False") {
        gameText[3].innerHTML = 'Incorrect. This is false.';
        gameText[4].innerHTML = currentFact.explanation;
        fadeIn(gameText[3], 250, "block");
        fadeIn(gameText[4], 250, "block");
    }
    // If the guess is correct, display "correct" message to user and log successful guess.
    else if (currentFact.answer === "True") {
        gameText[3].innerHTML = "True.";
        gameText[4].innerHTML = "Well done!";
        fadeIn(gameText[3], 250, "block");
        fadeIn(gameText[4], 250, "block");
        correctCount ++;
    }

    // Disable guess buttons.
    gameTrueBtn.disabled = true;
    gameFalseBtn.disabled = true;

    // Display the "next" button.
    fadeIn(gameNextBtn, 250, "inline-block");
}

/**
 * Function to guess the current fact on the screen is false.
 */
function guessFalse() {
    // If the guess is correct, display the "correct" message to the user and, if one exists, display the explanation.
    if (currentFact.answer === "False") {
        gameText[3].innerHTML = "Correct! This is false.";
        gameText[4].innerHTML = currentFact.explanation;
        fadeIn(gameText[3], 250, "block");
        fadeIn(gameText[4], 250, "block");
        correctCount ++;
    }

    // If the guess is incorrect, display the "incorrect" message to the user and explanation, if one exists.
    else if (currentFact.answer === "True") {
        gameText[3].innerHTML = "Incorrect. This is a true fact.";
        gameText[4].innerHTML = "Better luck next time :(";
        fadeIn(gameText[3], 250, "block");
        fadeIn(gameText[4], 250, "block");
    }

    // Disable the true and false buttons.
    gameTrueBtn.disabled = true;
    gameFalseBtn.disabled = true;

    // Display the "next" button.
    fadeIn(gameNextBtn, 250, "inline-block");
}

/**
 * Function to animate stretching the width of an element.
 * @param element The element to be stretched along its width.
 * @param startWidth  The element starting width.
 * @param endWidth The element ending width.
 * @param duration The duration of the animation.
 */
function stretchWidth(element, startWidth, endWidth, duration) {
    // The animation frames
    const widthFrames = [
        { width: startWidth },
        { width: endWidth }
    ];

    // The animation duration.
    const widthTiming = {
        duration: duration,
        iterations: 1,
    }

    // Animate the element using the above frames and duration.
    element.animate(widthFrames, widthTiming).finished.then(() => {
        // At the end of the animation, set the width to remain the final width.
        element.style.width = endWidth;
    });
}

/**
 * Function to animate stretching the height of an element.
 *
 * @param element The element to have its height stretched.
 * @param startHeight The starting height.
 * @param endHeight The ending height.
 * @param duration The duration of the animation.
 */
function stretchHeight(element, startHeight, endHeight, duration) {
    // The animation frames.
    const heightFrames = [
        { height: startHeight },
        { height: endHeight }
    ];

    // The animation duration.
    const heightTiming = {
        duration: duration,
        iterations: 1,
    }

    // Animate the input element using the input frames and duration.
    element.animate(heightFrames, heightTiming).finished.then(() => {
        // At the end of the animation, set the height to remain the final height.
        element.style.height = endHeight;
    });
}

/**
 * Function to animate an element fading out.
 *
 * @param element The element to be faded out.
 * @param duration The duration of the animation.
 */
function fadeOut(element, duration) {
    // The animation frames.
    const fadeOutFrames = [
        { opacity: 1 },
        { opacity: 0}
    ];

    // The animation duration.
    const fadeOutTiming = {
        duration: duration,
        iterations: 1,
    }

    // Animate the input element using the input frames and duration.
    element.animate(fadeOutFrames, fadeOutTiming).finished.then(() => {
        // At the end of the animation, stop displaying the element.
        element.style.display = "none";
    });
}

/**
 * Function to animate an element fading into existence.
 *
 * @param element The element to be faded in.
 * @param duration The duration of the animation.
 * @param displayType The CSS "display: " mode to be used for the element.
 */
function fadeIn(element, duration, displayType) {
    // Add the element to the screen.
    element.style.display = displayType;

    // Animation frames.
    const fadeInFrames = [
        { opacity: 0 },
        { opacity: 1 }
    ];

    // Animation duration.
    const fadeInTiming = {
        duration: duration,
        iterations: 1,
    }

    // Animate the element fading in with the above frames and duration.
    element.animate(fadeInFrames, fadeInTiming);
}

/**
 * Function to advance the game (used by the "next" button).
 */
function advanceGame() {
    // Fade out the "next" button.
    fadeOut(gameNextBtn, 250);

    // Re-enable the "true" and "false" buttons.
    gameTrueBtn.disabled = false;
    gameFalseBtn.disabled = false;

    // If the game is not done, get a new fact, continue playing, and fade out the result from the last guess.
    if (factIndex < 10) {
        playGame();
        fadeOut(gameText[3], 250);
        fadeOut(gameText[4], 250);
    }
    // If the game is done, display the results.
    else {
        displayResults();
    }
}

//------------------------------------------ EVENT LISTENERS --------------------------------------------

gameTrueBtn.addEventListener("click", () => guessTrue());

gameFalseBtn.addEventListener("click", () => guessFalse());

gameNextBtn.addEventListener("click", () => advanceGame());

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