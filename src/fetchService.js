import axios from 'axios';

export default class ImagesFetchService{

    constructor() {
        this.imagesForSearch = '';
        this.currentPage = 0;
        this.fetchedCards = 0;
        this.availableCards = 0;
    }

    async fetchImages() {

    const BASE_URL = "https://pixabay.com/api/";
        const KEY = "34144660-7b9b8b2468352e1d4cb8415b4";
        this.currentPage += 1;
        let url = `${BASE_URL}?key=${KEY}&q=${this.imagesForSearch}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.currentPage}&per_page=40`;
        
     try { 
         const images = await axios.get(url)         
        
         this.fetchedCards += (images.data.hits).length;
         this.availableCards = images.data.totalHits;
     
         return images;
        }
    catch (error){console.log(error)} ;
    } 
    get query(){
return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

}