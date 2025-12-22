import axios from "axios";


// const API_KEY = 'AIzaSyD4HN8vUY8-4Q4hMoX8Z32UFk99ZgXN66c';
// const API_KEY = 'AIzaSyBYac6e0cThdmJWIIUYkVsBHFzdh0guyrg';
// const API_KEY = 'AIzaSyA6w9Dy6ddtYmVLF7-EugrkUD2knMqQY00';
// const API_KEY = 'AIzaSyCXJGXFtIuVYw25RDP-HaQHCSW5rducLmM';
 
// const API_KEY = 'AIzaSyAOQeqXqwMO7yT5qte016BTJpMu3Py1Y9I';
// const API_KEY = 'AIzaSyA_Se5uedqvkRCM4HaQ0DsdKhbGC5svfNA';
// const API_KEY = 'AIzaSyCFQr26qUlxtquY1xTZ-lkmwKNuUFYUYvc';
// const API_KEY = 'AIzaSyA2-fHs2WysuhMFAdwItCqITn4Gb2oaNyY';
// const API_KEY = 'AIzaSyCseNSSJQXRc_5kpM-LkzjtXv7RVsXXtcs';
// const API_KEY = 'AIzaSyBgG_-c1dkGLkgBZSP9X93unP5Oyr9FcJw';


// new api
// const API_KEY = 'AIzaSyDNNA_uSWX-yg0cnvrjhgkgpfs02x3kAr8';
// const API_KEY = 'AIzaSyBYac6e0cThdmJWIIUYkVsBHFzdh0guyrg';
// const API_KEY = 'AIzaSyByuzs_O5oMShpdVKzPvaHHU34ylM4I0KU';
const API_KEY = 'AIzaSyC5EkmiHUPtvyKyfyouUHJ13LFWT_Rhj_k';
// const API_KEY = 'AIzaSyBEqwTX1EO7jptmhwAvIByHEBlN23OK4f0';
// const API_KEY = 'AIzaSyBb-5K0wVVE3xHK2rc5AVkrtdMyz0ktRDc';
// const API_KEY = 'AIzaSyAimGKEE1crJUajoHUoD02nCDHOGizjdMw';
// const API_KEY = 'AIzaSyAIi8VgLmgWhKlLLLRkRAGWCco6Nj2nY_I';


// AIzaSyAUFKx-gM8bnPAwj9sZm3d2QczA4JxB5tQ


// const API_KEY = 'AIzaSyAUFKx-gM8bnPAwj9sZm3d2QczA4JxB5tQ';

const BASE_URL = 'https://www.googleapis.com/youtube/v3';


export const fetchDataFromApi = async (url)=>{
    const {data} = await axios.get(`${BASE_URL}/${url}&key=${API_KEY}`);
    return data;
}

