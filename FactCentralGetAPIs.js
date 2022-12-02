/**
 * Fetches JSON data from the API at the provided URL.
 *
 * @param url The web address of the API from which to retrieve data.
 * @returns {Promise<boolean>}
 * @returns The data from the API response, or false if no response is received.
 */
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

/**
 * Randomly picks a header from a list of options. This is used to give a title
 * to each fact from the API such as "Did you know? [fact from API]"
 *
 * @returns {string} A randomly selected header for a fact, such as "Did you know?"
 */
function getFactHeader() {
    let factHeaders = ["Did you know?",
        "Really?",
        "Hmmm...",
        "Would you ever guess...",
        "Wow!"];

    // generates a random number to be used as an index in the array above.
    return factHeaders[Math.floor(Math.random() * factHeaders.length)];
}

/**
 * Creates a floating pane containing the input fact and inserts it into the
 * page's HTML.
 *
 * @param fact The text (a fact) to be displayed on the page.
 */
function displayFact(fact) {
    // Create new HTML elements
    let newPageTile = document.createElement("div");
    let factText = document.createElement("p");
    let factTitle = document.createElement("h2");

    // Insert the fact into the newly created HTML elements
    factTitle.innerHTML = getFactHeader();
    factText.innerHTML = fact;

    // Create nesting structure of HTML elements in floating pane.
    newPageTile.appendChild(factTitle);
    newPageTile.appendChild(factText);

    // Add the new fact to the HTML page and ensure it has the correct class for styling.
    newPageTile.classList.add("pageTile");
    document.getElementById("factsContainer").prepend(newPageTile);
}

/**
 * Function to handle the combination and ordering of getting facts from the API, displaying them,
 * and taking care of any potentially resulting errors.
 *
 * @param url The url of the desired API.
 * @param location The location of the fact within the returned JSON object.
 */
function getFact(url, location) {
    fetchFromAPI(url).then((receivedData) => {
        displayFact(eval(location));
    }).catch(() => {
        displayFact("The API went splat :(")
    });
}