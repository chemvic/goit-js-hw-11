import './css/styles.css';
import axios from 'axios';
// import throttle  from 'lodash.throttle';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox"; 
import "simplelightbox/dist/simple-lightbox.min.css";
import ImagesFetchService from '../src/fetchService';
import { galleryEl, drawGallery } from '../src/drawGallery';
import 'intersection-observer';


const formEL = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');

formEL.addEventListener('submit', onSubmite);
// loadMoreBtn.addEventListener('click', onLoadMore);

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


const io = new IntersectionObserver(([entry], observer) => {
  if (entry.isIntersecting) {
    observer.unobserve(entry.target);
    if (imagesFetchService.fetchedCards !== imagesFetchService.availableCards) { onLoadMore(); };
  }
}, {threshold: 1,});


function onLoadMore(event) {  
 imagesFetchService.fetchImages()
      .then(renderImages);  
}

   

function renderImages(images) {
   
  if ((images.data.hits).length === 0 && imagesFetchService.fetchedCards === 0) {
    Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    return;
  };
       
       
  if (imagesFetchService.availableCards && imagesFetchService.currentPage === 1) {
    Notify.success(`Hooray! We found ${imagesFetchService.availableCards} images.`);
    
    // Для реализации бесконечного скролла
    //  используя событие скролл ипозицию вьюпорта 

    // window.addEventListener('scroll',onContinue);     
        
  }
    drawGallery(images);

  io.POLL_INTERVAL = 500; // Time in milliseconds.
  const lastPhotoCardEl = document.querySelector('.gallery>.photo-card:last-child');
  
  if (lastPhotoCardEl) {
    io.observe(lastPhotoCardEl);
}         
      
  if (imagesFetchService.fetchedCards === imagesFetchService.availableCards) {
    Notify.info("We're sorry, but you've reached the end of search results.");
   
    // Для реализации бесконечного скролла
    //  используя событие скролл ипозицию вьюпорта 
    
    // window.removeEventListener('scroll', onContinue);
    hideButton();
  }


    let lightbox = new SimpleLightbox('.gallery__item');
    lightbox.refresh();
   
    // Для кнопки loadMore
    if (imagesFetchService.availableCards && imagesFetchService.fetchedCards !== imagesFetchService.availableCards) { showButton(); };
  
}

function hideButton() {
  loadMoreBtn.classList.add('is-hidden');
};

function showButton() {
  loadMoreBtn.classList.remove('is-hidden');
};

 // Для реализации бесконечного скролла
    //  используя событие скролл ипозицию вьюпорта 


// const onContinue=
//   throttle(() => {
//     const documentRect = document.documentElement.getBoundingClientRect();
//     if (documentRect.bottom < document.documentElement.clientHeight + 500) {
//       onLoadMore();
//     }
//   },1500 );

function resetOn() {  
  galleryEl.innerHTML = '';
  imagesFetchService.currentPage = 0;
  imagesFetchService.fetchedCards = 0;
  imagesFetchService.availableCards = 0;
   hideButton();
}
