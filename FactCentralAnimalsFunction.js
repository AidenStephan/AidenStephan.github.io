let homeBtn = document.getElementById("homeBtn");
let getFactBtn = document.getElementById("getFactBtn");
let factsContainer = document.getElementById("factsContainer")
let animalFactsBtn = document.getElementById("animalFactsBtn");
let uselessFactsBtn = document.getElementById("uselessFactsBtn");
let factOrFictBtn = document.getElementById("factOrFictBtn");
let docTitle = document.title;
let screenWidth = screen.width;
let htmlRoot = document.querySelector(":root");

let catFactsUrl = "https://meowfacts.herokuapp.com/"
let dogFactsUrl =  "https://api.codetabs.com/v1/proxy?quest=https://dog-api.kinduff.com/api/facts";
let zooAnimalFactsUrl = "https://api.api-ninjas.com/v1/animals?name=cheetah";

htmlRoot.style.setProperty("--page-width", `${screenWidth}px`)
console.log("HIIII");
console.log(docTitle);

async function getCritterFact(url) {
   let data;
   let response = await fetch(url);
   if (response.ok) {
      data = await response.json();
   } else {
      data = false;
   }
   return data;
}

function getFactHeader() {
   let factHeaders = ["Did you know?",
                     "Really?",
                     "Hmmm...",
                     "Would you ever guess...",
                     "Wow!"];
   return factHeaders[Math.floor(Math.random() * factHeaders.length)];
}

function displayFact(fact) {
   let newPageTile = document.createElement("div");
   let factText = document.createElement("p");
   let factTitle = document.createElement("h2");

   factTitle.innerHTML = getFactHeader();
   factText.innerHTML = fact;

   newPageTile.appendChild(factTitle);
   newPageTile.appendChild(factText);

   newPageTile.classList.add("pageTile");
   factsContainer.prepend(newPageTile);
}

homeBtn.addEventListener('click', () => {
   window.location = "FactCentralHome.html";
});

getFactBtn.addEventListener("click", e => {
   let functionResult;
   e.preventDefault();
   let animalType = document.getElementById("animalType").value;

   if (animalType === "cat") {
      functionResult = getCritterFact(catFactsUrl);
   }
   else if (animalType === "dog") {
      functionResult = getCritterFact(dogFactsUrl);
   }
   else if (animalType === "zoo") {
      functionResult = getCritterFact(zooAnimalFactsUrl);
   }

   functionResult.then((receivedData) => {
      console.log("DATA: ");
      console.log(receivedData);
      displayFact(Object.values(receivedData)[0][0]);
   });
});


// TODO: deal with no response "false return from get methods" from API
// TODO: ignore when cat API returns "invalid command" or "unsubscribe code"