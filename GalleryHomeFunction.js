let submitBtn = document.getElementById("submitBtn");
let inputText = document.getElementById("imgSubject");
let image1 = document.getElementById("img1");

submitBtn.addEventListener("click", async e => {

   // Text box functions.
   e.preventDefault();
   console.log(inputText.value);
   inputText.value = "";

   // Link/request stuff.
   let url = "https://api.unsplash.com/search/photos?client_id=7qYCm8Ow4ntFgiF61Pqu1MncO7FSN66wtHI5CzoCqMo&page=1&query=office&>"
   let response = await fetch(url);
   let jsonData = await response;
   image1.src = jsonData.url;
   console.log(jsonData.url);
   console.log(jsonData);
   //console.log(jsonData.updated_at)
});

// let url = "https://source.unsplash.com/random";
//let userUrl = "https://api.unsplash.com/photos/?client_id=7qYCm8Ow4ntFgiF61Pqu1MncO7FSN66wtHI5CzoCqMo"
