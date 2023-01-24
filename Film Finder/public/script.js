const tmdbKey = 'adff303c826fcf61efde2831cbfb234c';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
const genreRequestEndpoint = '/genre/movie/list';
const requestParams = `?api_key=${tmdbKey}`;
const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;

try{
const response = await fetch(urlToFetch);
if (response.ok) {
  const jsonResponse = await response.json();
  //console.log(jsonResponse);
  const genres = jsonResponse.genres;
  //console.log(genres);
  return genres;
    } 
  }
  catch(error){
  console.log(error);
};
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
 const discoverMovieEndpoint = '/discover/movie';
 const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`
 const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;
 try {
const response = await fetch(urlToFetch);
if (response.ok) {
  const jsonResponse = await response.json();
  const movies = jsonResponse.results;
  return movies;
}
 } catch(error) {
   console.log(error);
 }
 };



const getMovieInfo = async (movie) => 
{
const movieId = movie.id;

console.log(movieId);
const movieEndPoint = `/movie/${movieId}`;

const requestParams = `?api_key=${tmdbKey}`;

const urlToFetch = `${tmdbBaseUrl}${movieEndPoint}${requestParams}`;
 try {
const response = await fetch(urlToFetch);
if (response.ok) {
  const jsonResponse = await response.json();
  const movieInfo = jsonResponse;
  return movieInfo;
}
 } catch(error) {
   console.log(error);
 }
};


// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
const movies = await getMovies();
const randomMovie = getRandomMovie(movies);
const info = await getMovieInfo(randomMovie);
displayMovie(info);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;