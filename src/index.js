import './css/styles.css';
// import axios from 'axios';
const axios = require('axios').default;
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox"; 
import "simplelightbox/dist/simple-lightbox.min.css";
// import fetchImages from '../src/fetchImages';

const formEL = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
formEL.addEventListener('submit', onSubmite);
loadMoreBtn.addEventListener('click', onLoadMore);
// document.addEventListener('keydown', onEscKeyPress);

let currentPage = 1;
let imagesForSearch = '';
let fetchedCards = 0;
let availableCards = 0;


// const { height: cardHeight } = document
//   .querySelector(".gallery")
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });

function onSubmite(event) {
  event.preventDefault();

  resetOn();


  imagesForSearch = event.currentTarget.elements.searchQuery.value;
  
  if (imagesForSearch.trim() === "") { hideButton();formEL.reset(); return; };
  
    fetchImages(imagesForSearch)
      .then( renderImages);
  
  formEL.reset(); 
    
}

function onLoadMore(event) {
  
 fetchImages(imagesForSearch)
      .then(renderImages);
  
}


async function fetchImages(imagesForSearch) {

    const BASE_URL = "https://pixabay.com/api/";
  const KEY = "34144660-7b9b8b2468352e1d4cb8415b4";
  
     try {
     const images= await axios.get(`${BASE_URL}?key=${KEY}&q=${imagesForSearch}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=40`)
      
availableCards = images.data.totalHits;
     if ((images.data.hits).length === 0) {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");
       return;
      };

       if (availableCards&&currentPage===1) {
    Notify.success(`Hooray! We found ${availableCards} images.`);
  }
      currentPage += 1;
      fetchedCards += (images.data.hits).length;
      
      
      if (fetchedCards===availableCards) {
        Notify.info("We're sorry, but you've reached the end of search results.");
        // hideButton();

        // Убираем бесконечный скролл

          window.removeEventListener('scroll', () => {
  const documentRect = document.documentElement.getBoundingClientRect();

  if (documentRect.bottom <document.documentElement.clientHeight + 200) {
    onLoadMore();
  }
   });
        
      }     
         return images;
        }
         catch (error) {
    console.error(error);
  }

}   
   

 function renderImages(images) {
 
    const markup = (images.data.hits).map(({webformatURL,largeImageURL,tags,likes,views,comments,downloads}) => {
        return `<div class="photo-card"><a class="gallery__item" href="${largeImageURL}"><img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
  
  <div class="info">
    <p class="info-item">
      <b>Likes</b><span>${likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b><span>${views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b><span>${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b><span>${downloads}</span>
    </p>
  </div>
</div>`
    }).join("");    
 
  galleryEl.insertAdjacentHTML('beforeend', markup);
  
  let lightbox = new SimpleLightbox('.gallery__item');
  lightbox.refresh();
  
 if (availableCards&&fetchedCards!==availableCards) {
    // showButton();
   
  //  Добавляем прослушиватель на бесконечній скролл
   
   window.addEventListener('scroll', () => {
  const documentRect = document.documentElement.getBoundingClientRect();

  if (documentRect.bottom <document.documentElement.clientHeight + 200) {
    onLoadMore();
  }
   });
   
  }
   }

// function onEscKeyPress(event) {
  
//   if (event.code === "Escape"&&!lightbox.off) {
//     formEL.reset();
   
//     resetOn();
//   }
// }



function hideButton() {
  loadMoreBtn.classList.add('is-hidden');
};

function showButton() {
  loadMoreBtn.classList.remove('is-hidden');
};

function resetOn() {
   hideButton();
  galleryEl.innerHTML = '';
  currentPage = 1;
  fetchedCards = 0;
  availableCards = 0;
};

// window.addEventListener('scroll', () => {
//   const documentRect = document.documentElement.getBoundingClientRect();

//   if (documentRect.bottom <document.documentElement.clientHeight + 200) {
//     onLoadMore();
//   }

// });