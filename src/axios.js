import axios from "axios";



const tmdbInstance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});

export default tmdbInstance;