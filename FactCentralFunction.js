// let homeBtn = document.getElementById("homeBtn");
let animalFactsTile = document.getElementById("animalFactsTile");
let animalFactsBtn = document.getElementById("animalFactsBtn");
let uselessFactsBtn = document.getElementById("uselessFactsBtn");
let factOrFictBtn = document.getElementById("factOrFictBtn");
let docTitle = document.title;
let screenWidth = screen.width;
let htmlRoot = document.querySelector(":root");


htmlRoot.style.setProperty("--page-width", `${screenWidth}px`)
console.log("HIIII");
console.log(docTitle);

// if (docTitle.includes("Home")) {
//     homeBtn.classList.add("activeBtn");
// }

animalFactsTile.addEventListener('mouseover', () => {
    animalFactsBtn.classList.add("btnHover");
    document.getElementsByClassName("navTileText")[0].style.display = "block";
    animalFactsTile.style.cursor = "pointer";
});

animalFactsTile.addEventListener('mouseout', () => {
   animalFactsBtn.classList.remove('btnHover');
   document.getElementsByClassName("navTileText")[0].style.display = "none";
});



// let rootStyles = getComputedStyle(htmlRoot);
