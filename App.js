// Global Variables
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];

let ready = false;
let imageCount = 0;
let readyImage = 0;

// Unsplash Api
const count = 30;
const orientation = "portrait";
const apiKey = "JKPZfuZpCTOskPYbF8kznHTCP07WTJ-CkS1bI3E6AUw";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}&orientation=portrait&content_filter=high`;

// Get Photos From unsplash Api
async function getPhotos() {
  try {
    const resAPI = await fetch(apiUrl);
    photosArray = await resAPI.json();
    displayPhotos();
  } catch (error) {
    console.log(error.message);
  }
}
// Check if Photo Are Loaded
function imageIsLoaded() {
  imageCount++;
  if (imageCount === readyImage) {
    ready = true;
    loader.hidden = true;
  }
}

//Help Function
function setAttribute(element, attributes) {
  for (const keys in attributes) {
    element.setAttribute(keys, attributes[keys]);
  }
}
// Create Links for Photo & Link , Add to DOM
function displayPhotos() {
  imageCount = 0;
  readyImage = photosArray.length;

  photosArray.forEach((photo) => {
    // Create Photo <a> to Unsplash
    const item = document.createElement("a");

    setAttribute(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // Image for photo
    const img = document.createElement("img");
    setAttribute(img, {
      src: photo.urls.regular,
      alt: photo.description,
      title: photo.description,
    });

    // Event Listener when each is finished Loading
    img.addEventListener("load", imageIsLoaded);
    //Put <img> inside <a>, then put the imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Check if scrolling Ends near bottom load more of page, More Photos
window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// on loading
getPhotos();
