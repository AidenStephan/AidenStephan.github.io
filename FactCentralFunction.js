// let homeBtn = document.getElementById("homeBtn");
let animalFactsTile = document.getElementById("animalFactsTile");
let animalFactsBtn = document.getElementById("animalFactsBtn");
let uselessFactsTile = document.getElementById("uselessFactsTile")
let factOrFictBtn = document.getElementById("factOrFictBtn");
let docTitle = document.title;
let screenWidth = screen.width;
let htmlRoot = document.querySelector(":root");


htmlRoot.style.setProperty("--page-width", `${screenWidth}px`)
updatePageWidth();

// if (docTitle.includes("Home")) {
//     homeBtn.classList.add("activeBtn");
// }

function updatePageWidth() {
    htmlRoot.style.setProperty("--page-width", String(window.innerWidth));
    console.log("pageWidth: " + htmlRoot.style.getPropertyValue("--page-width"));
}

animalFactsTile.addEventListener('mouseover', () => {
    animalFactsBtn.classList.add("btnHover");
    document.getElementsByClassName("navTileText")[0].style.display = "block";
    animalFactsTile.style.cursor = "pointer";
});

animalFactsTile.addEventListener('mouseout', () => {
   animalFactsBtn.classList.remove('btnHover');
   document.getElementsByClassName("navTileText")[0].style.display = "none";
});

uselessFactsTile.addEventListener('mouseover', () => {
    uselessFactsBtn.classList.add("btnHover");
    document.getElementsByClassName("navTileText")[1].style.display = "block";
    uselessFactsBtn.style.cursor = "pointer";
});

uselessFactsTile.addEventListener('mouseout', () => {
    uselessFactsBtn.classList.remove('btnHover');
    document.getElementsByClassName("navTileText")[1].style.display = "none";
});

onresize = () => {
    updatePageWidth();
};
