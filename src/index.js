import './css/styles.css';
// import axios from 'axios';
const axios = require('axios').default;
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import fetchImages from '../src/fetchImages';

const formEL = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
formEL.addEventListener('submit', onSubmite);
loadMoreBtn.addEventListener('click', onLoadMore);

let currentPage = 1;
let imagesForSearch = '';


function onSubmite(event) {
  event.preventDefault();
  galleryEl.innerHTML = '';
  currentPage = 1;
  
  imagesForSearch = event.currentTarget.elements.searchQuery.value;
  
  if (imagesForSearch === "") { hideButton(); return; };
  
    fetchImages(imagesForSearch)
      .then(renderImages);
  showButton();
  formEL.reset();
  
}

function onLoadMore(event) {
  
 fetchImages(imagesForSearch)
      .then(renderImages);
  
}


async function fetchImages(imagesForSearch) {

    const BASE_URL = "https://pixabay.com/api/";
  const KEY = "34144660-7b9b8b2468352e1d4cb8415b4";
 
  console.log(currentPage);
  console.log(imagesForSearch);

    try {
     const images= await axios.get(`${BASE_URL}?key=${KEY}&q=${imagesForSearch}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=40`)
      currentPage += 1;
     
      // if (images.data.hits.lenght === 0) {
      //   console.log("Sorry, there are no images matching your search query. Please try again.");
      // };
// images.data.totalHits
      
      return images;
        }
         catch (error) {
    console.error(error);
  }

   }    

function renderImages(images) {
//  let hits = 0;
//       hits += Number(images.data.hits);
//   console.log(Number(images.data.hits));
  
    console.log(images);
    const markup = (images.data.hits).map(({webformatURL,largeImageURL,tags,likes,views,comments,downloads}) => {
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

function hideButton() {
  loadMoreBtn.classList.add('is-hidden');
};

function showButton() {
  loadMoreBtn.classList.remove('is-hidden');
};
     
