
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//we're using Unsplash API
const count = 30;
const apiKey = 'ZnbtZii7fT73QrLGVpjtUCUQOHpQzkRuq2vgy52du_c';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check if all images were loaded
function imageLoaded(){
    console.log('image loaded');
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready = true;
        console.log('ready =', ready);
    }
}

//Create Elements for Links & Photos, Add to DOM
//Helper function to set Attributes on DOM elements
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}


function displayPhotos() {
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    //run function for each object in photosArray
    photosArray.forEach((photo) => {
        //Create <a> to link to Unsplash
        const item = document.createElement('a');
       // item.setAttribute('href', photo.links.html);
       // item.setAttribute('target', '_blank');
       setAttributes(item, {
           href: photo.links.html, 
           target: '_blank',

       });
        //Create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular, 
            alt: photo.alt_description,
            title: photo.alt_description
        } )

//Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        //Put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}




//Get photos from Unsplash API
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch(error){
        //Catch Error
    }
}

//Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// On load
getPhotos();