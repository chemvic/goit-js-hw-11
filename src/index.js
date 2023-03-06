import './css/styles.css';
// import axios from 'axios';
const axios = require('axios').default;
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const BASE_URL = "https://pixabay.com/api/";
const KEY = "34144660-7b9b8b2468352e1d4cb8415b4";

const formEL = document.querySelector('#search-form');

formEL.addEventListener('submit', onSubmite);

function onSubmite(event) {
    event.preventDefault();
    const imagesForSearch = event.currentTarget.elements.searchQuery.value;
    
    fetchImages(imagesForSearch)
        .then(response => console.log(response));
       

    
}


async function fetchImages(imagesForSearch) {
    try {
        return await axios.get(`${BASE_URL}?key=${KEY}&q=${imagesForSearch}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`)
            console.log(response.data);
        }
         catch (error) {
    console.error(error);
  }

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










