let submitBtn = document.getElementById("submitBtn");
let inputText = document.getElementById("imgSubject");

submitBtn.addEventListener("click", async e => {
   e.preventDefault();
   console.log(inputText.value);
   inputText.value = "";
   let url = "https://source.unsplash.com/random";
   let response = await fetch(url);
   let jsonData = await response.json();
   console.log(jsonData);
});