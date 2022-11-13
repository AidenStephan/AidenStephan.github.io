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
let updateBtn = document.getElementById("imgNumBtn");
let inputText = document.getElementById("imgSubject");
let imageArea = document.getElementById("imageArea");

// Information to assemble request URL for Unsplash.
let subjectQuery = "";
let unsplashUrl = "https://api.unsplash.com/search/photos";
let clientId = "7qYCm8Ow4ntFgiF61Pqu1MncO7FSN66wtHI5CzoCqMo";
let itemsPerPage = "25"
let pages = "4";

// Variables to hold data about the images.
let imageData;
let prevNumImgs = 0;
let numImgs = 5;

// -------------------------------------------------- FUNCTIONS --------------------------------------------------------
/**
 * Asynchronous function that requests images of the desired subject from Unsplash.
 *
 * @returns {Promise<boolean>}
 * @returns JSON data received from Unsplash
 */
async function getImages() {
   let dataSet = [];

   for (let i = 1; i <= pages; i ++) {
      // Assembles the request link for Unsplash.
      let url = `${unsplashUrl}?client_id=${clientId}&page=${i}&query=${subjectQuery}&per_page=${itemsPerPage}`;
      let data;

      // Gets the image data from Unsplash.
      let response = await fetch(url);
      if (response.ok) {
         data = await response.json();
         console.log("DATA: ")
         console.log(data);
      } else {
         data = false;
      }
      dataSet[i-1] = data;
      // dataSet = data;
   }


   // Returns the full JSON data received from Unsplash.
   return dataSet;
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
   console.log(imageId);
}

function addOrRemoveImages() {
   console.log("prev: " + prevNumImgs);
   console.log("new: " + numImgs);

   let difference = numImgs - prevNumImgs;

   console.log("difference: " + difference);

   if (difference > 0) {
      console.log("first IF");


      for (let i = 0; i < difference; i++) {
         let newImage = document.createElement("img");
         console.log("THE TYPE : " + typeof(prevNumImgs));
         newImage.id = `img${prevNumImgs + i}`;
         // console.log(`img${imageIdNum}`);
         newImage.alt = "random image";
         imageArea.appendChild(newImage);
      }
   }
   else if (difference < 0) {
      console.log("second iF");
      let difference = prevNumImgs - numImgs;

      for (let i = 0; i < difference; i++) {
         imageArea.removeChild(document.getElementById(`img${prevNumImgs - i - 1}`));
      }
   }

   prevNumImgs = numImgs;
}

/**
 * Takes the URLs from the image data and displays them on the page.
 */
function updateImages() {
   // TODO: make sure that enough images are received to display
   // TODO: make this the input amount of images to display.
   let numReturnedImgs = 0;
   let numReturnedPages = 0;

   for (let page of imageData) {
      numReturnedImgs += page.length;
      if (page.length !== 0) {
         numReturnedPages += 1;
      }
   }

   let imgUrls = [];

   console.log("num returned: " + numReturnedImgs);
   console.log("pages returned: " + numReturnedPages);

   addOrRemoveImages();
   console.log(imageArea.childNodes);

   let htmlImgNums = Array.from(new Array(numReturnedPages), (x, i) => i)
       .sort((a, b) => 0.5 - Math.random());

   for (let i = 0; i < parseInt(pages); i++) {
      let itemsOnPage = imageData[i].length;

      let receivedImgNums = Array.from(new Array(itemsOnPage), (x, i) => i)
          .sort((a, b) => 0.5 - Math.random());
      console.log(receivedImgNums);


      for (let j = 0; j < itemsOnPage; j++) {
         console.log("imgNum: " + receivedImgNums[j]);
         imgUrls.push(imageData[htmlImgNums[i]][receivedImgNums[j]].urls.regular);
      }
   }

   for (let i = 0; i < numImgs; i++) {
      setImage(i, imgUrls[i]);
   }
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
   e.preventDefault();
   getInput();

   if (subjectQuery !== "") {
      getImages().then((receivedData) => {
         for (let i = 0; i < receivedData.length; i++) {
            receivedData[i] = Object.values(receivedData[i])[2];
         }
         // let values = Object.values(result);
         // let imageUrl = values[2][2].urls.regular;
         return receivedData;
      }).then((imagesData) => {
         imageData = imagesData;
         updateImages();
      });
   }
});

/**
 * Event listener for the "Update" button to refresh the number of images displayed.
 */
updateBtn.addEventListener("click", (e) => {
   e.preventDefault();
   if (imageData != null) {
      prevNumImgs = numImgs;
      numImgs = parseInt(document.getElementById("numImgs").value);
      updateImages();
   }
});

// TODO: ideas: Make 'download buttons.'
// TODO: fix problem with word 'Nirvana'








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

