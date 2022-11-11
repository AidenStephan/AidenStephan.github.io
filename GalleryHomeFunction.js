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
   let jsonData = await response.json();

   // console.log(jsonData.url);
   console.log(jsonData);
   console.log("here is the data: " + jsonData);


   // let request = makeHttpObject();
   //
   // request.open("GET", url, true);
   // request.send(null);
   // request.onreadystatechange = function() {
   //    if (request.readyState === 4) {
   //       let replyContent = JSON.parse(request.responseText);
   //       console.log(replyContent);
   //       getData(replyContent);
   //    }
   // };
});

//
// function getData(replyData) {
//    console.log(replyData);
//    console.log(typeof(replyData));
//    console.log(replyData.keys);
// }
//
// function makeHttpObject() {
//    try {
//       return new XMLHttpRequest();
//    }
//    catch (error) {}
//    try {
//       return new ActiveXObject("Msxml2.XMLHTTP");
//    }
//    catch (error) {}
//    try {
//       return new ActiveXObject("Microsoft.XMLHTTP");
//    }
//    catch (error) {}
//
//    throw new Error("Could not create HTTP request object.");
// }



// let url = "https://source.unsplash.com/random";
//let userUrl = "https://api.unsplash.com/photos/?client_id=7qYCm8Ow4ntFgiF61Pqu1MncO7FSN66wtHI5CzoCqMo"
