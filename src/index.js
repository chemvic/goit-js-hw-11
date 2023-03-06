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
    console.log(imagesForSearch);

    fetchImages(imagesForSearch)
        .then(console.log(response.json()))
        .catch(console.error(error))
;

    // axios.get("https://pixabay.com/api/", {
       
    //     params: {
    //         key:"34144660-7b9b8b2468352e1d4cb8415b4",
    //         q: '${ imagesForSearch }',
    //         image_type: 'photo',
    //         orientation: 'horizontal',
    //         safesearch: 'true',
    //         page: '1',
    //         per_page:'40',
    //     },
    //      headers: {
    //         "Content-Type": 'aplication/JSON',
    //         Authorization: KEY,
    //     }
    // },
    // ).then(response => console.log(response.data))
    //     .catch(error => console.error(error));

    function fetchImages(imagesForSearch) {

        const options = {
    //   method:'GET',
     parameters: {
            // key:"34144660-7b9b8b2468352e1d4cb8415b4",
            // q: '${ imagesForSearch }',
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            page: '1',
            per_page:'40',
        },
         headers: {
            "Content-Type": 'aplication/JSON',
           
        }
}

        return fetch('https://pixabay.com/api/?key=34144660-7b9b8b2468352e1d4cb8415b4&q=dog')
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status);
               
                }; 
                return response.json();
            });   
            
    }


}

