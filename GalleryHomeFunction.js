/**
 * A program that gets images from Unsplash, an API that provides free stock images.
 * The user can input a subject in the textbook and then this program will make a
 * request to Unsplash and return the results.
 *
 * @author: astephan18@georgefox.edu
 * @type {HTMLElement}
 */

// -------------------------------------------------- VARIABLES --------------------------------------------------------
// Getting the HTML submit button and text input box.
let submitBtn = document.getElementById("submitBtn");
let inputText = document.getElementById("imgSubject");

// Information to assemble request URL for Unsplash.
let subjectQuery;
let unsplashUrl = "https://api.unsplash.com/search/photos";
let clientId = "7qYCm8Ow4ntFgiF61Pqu1MncO7FSN66wtHI5CzoCqMo";
let pages = "1";

// -------------------------------------------------- FUNCTIONS --------------------------------------------------------
/**
 * Asynchronous function that requests images of the desired subject from Unsplash.
 *
 * @returns {Promise<boolean>}
 * @returns JSON data received from Unsplash
 */
async function getImages() {
   // Assembles the request link for Unsplash.
   let url = `${unsplashUrl}?client_id=${clientId}&page=${pages}&query=${subjectQuery}`;
   let data;

   // Gets the image data from Unsplash.
   let response = await fetch(url);
   if (response.ok) {
      data = await response.json();
   }
   else {
      data = false;
   }

   // Returns the full JSON data received from Unsplash.
   return data;
}

/**
 * Sets the images on the page to the ones received from Unsplash.
 *
 * @param imageNum The number used in the HTML image ID.
 * @param url The desired image URL (received from Unsplash).
 */
function setImage(imageNum, url) {
   // Assembles the HTML ID of the image and retrieves it.
   let imageId = `img${imageNum}`;
   let htmlImg = document.getElementById(imageId);

   // Sets the image source to the input URL.
   htmlImg.src = url;
}

function updateImages(imageData) {
   // TODO: make sure that enough images are received to display
   // TODO: make this the input amount of images to display.
   let numImgs = 6;
   let numReturnedImgs = Object.keys(imageData).length;

   let htmlImgNums = Array.from(new Array(6), (x, i) => i)
               .sort((a, b) => 0.5 - Math.random());

   let receivedImgNums = Array.from(new Array(numReturnedImgs), (x, i) => i)
       .sort((a, b) => 0.5 - Math.random());

   for (let i = 0; i < htmlImgNums.length; i++) {
      console.log(i);
      console.log(imageData[receivedImgNums[i]].urls.regular);
      setImage(htmlImgNums[i], imageData[receivedImgNums[i]].urls.regular);
   }


   console.log("number array: " + htmlImgNums);
   console.log("results array: " + receivedImgNums);
   // setImage(1, imageData[1].urls.regular)
   console.log("number of images: " + Object.keys(imageData).length);

}

/**
 * Gets the text in the "input" box, clears the text box, and stores the input value;
 */
function getInput () {
   let subjectInput = inputText.value;
   inputText.value = "";
   subjectQuery = subjectInput;
}

// ----------------------------------------------------- EVENTS --------------------------------------------------------
/**
 * Event Listener for the "Submit" button;
 */
submitBtn.addEventListener("click", (e) => {
   // TODO: ensure different image every time.
   e.preventDefault();
   getInput();

   getImages().then((result) => {
      let values = Object.values(result);
      // let imageUrl = values[2][2].urls.regular;
      return values[2];
   }).then((imagesData) => {
      updateImages(imagesData);
   });
});


// TODO: ideas: Make 'download buttons.'









   // console.log(jsonData.url);
   // console.log(jsonData);
   // console.log("here is the data: " + typeof(jsonData));


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

