import './css/styles.css';
// import axios from 'axios';
const axios = require('axios').default;
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import fetchImages from '../src/fetchImages';

const formEL = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');

formEL.addEventListener('submit', onSubmite);

function onSubmite(event) {
    event.preventDefault();
    const imagesForSearch = event.currentTarget.elements.searchQuery.value;
    if (imagesForSearch === "") { return; };
    fetchImages(imagesForSearch)
        .then(renderImages);

}

async function fetchImages(imagesForSearch) {

    const BASE_URL = "https://pixabay.com/api/";
    const KEY = "34144660-7b9b8b2468352e1d4cb8415b4";
    
    try {
        return await axios.get(`${BASE_URL}?key=${KEY}&q=${imagesForSearch}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`)
          
        }
         catch (error) {
    console.error(error);
  }

   }    

function renderImages(images) {
      galleryEl.innerHTML = "";
    console.log(images);
    const markup = (images.data.hits).map(({webformatURL,tags, likes,views,comments,downloads}) => {
        return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
</div>`
    }).join("");
    
 
    galleryEl.insertAdjacentHTML('beforeend', markup);

   }

    
     
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      //  async   function fetchImages(imagesForSearch) {
         // return await fetch(`${BASE_URL}?key=${KEY}&q=${imagesForSearch}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`)
        //     .then(response => {
        //         if (!response.ok) {
        //             throw new Error(response.status);
               
        //         }; 
        //         return response.json();
        //     });   
            




       //     const options = {
    //   method:'GET',
    //  parameters: {
    //         key:KEY,
    //         q: '${ imagesForSearch }',
    //         image_type: 'photo',
    //         orientation: 'horizontal',
    //         : 'true',
    //         : '1',
    //         :'40',
    //     },
    //      headers: {
    //         "Content-Type": 'aplication/JSON',
           
        // }
// }

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++










