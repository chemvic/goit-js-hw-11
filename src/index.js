import './css/styles.css';
import axios from 'axios';
import throttle  from 'lodash.throttle';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox"; 
import "simplelightbox/dist/simple-lightbox.min.css";
import ImagesFetchService from '../src/fetchService';

const formEL = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
formEL.addEventListener('submit', onSubmite);
loadMoreBtn.addEventListener('click', onLoadMore);

const imagesFetchService = new ImagesFetchService();

function onSubmite(event) {
  event.preventDefault();

  resetOn();
  imagesFetchService.imagesForSearch = event.currentTarget.elements.searchQuery.value;
  
  if (imagesFetchService.imagesForSearch.trim() === "") {
     formEL.reset(); return;
    // hideButton();
  };
  
    imagesFetchService.fetchImages()
      .then(renderImages);
  
  formEL.reset(); 
    
}

function onLoadMore(event) {  
 imagesFetchService.fetchImages()
      .then(renderImages);  
}


  

function drawGallery(images) {
     const markup = (images.data.hits).map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
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
}
   

function renderImages(images) { 
   
     if ((images.data.hits).length === 0&&imagesFetchService.fetchedCards===0) {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");
       return;
       };      
       
       
       if (imagesFetchService.availableCards&&imagesFetchService.currentPage===1) {
         Notify.success(`Hooray! We found ${imagesFetchService.availableCards} images.`);
          window.addEventListener('scroll',onContinue);
  }
           
      
      if (imagesFetchService.fetchedCards===imagesFetchService.availableCards) {
        Notify.info("We're sorry, but you've reached the end of search results.");
        window.removeEventListener('scroll', onContinue);        
        hideButton();        
  } 

  drawGallery(images);
  
  let lightbox = new SimpleLightbox('.gallery__item');
  lightbox.refresh();
   
  // Для кнопки loadMore
   if (imagesFetchService.availableCards&&imagesFetchService.fetchedCards!==imagesFetchService.availableCards) {showButton();};
}

function hideButton() {
  loadMoreBtn.classList.add('is-hidden');
};

function showButton() {
  loadMoreBtn.classList.remove('is-hidden');
};
   
const onContinue=
  throttle(() => {
    const documentRect = document.documentElement.getBoundingClientRect();
    if (documentRect.bottom < document.documentElement.clientHeight + 500) {
      onLoadMore();
    }
  },1500 );

function resetOn() {  
  galleryEl.innerHTML = '';
  imagesFetchService.currentPage = 0;
  imagesFetchService.fetchedCards = 0;
  imagesFetchService.availableCards = 0;
   hideButton();
}
