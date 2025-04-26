
const apiKey = '68959a0a6c35f6870e29294220e06053';  // Reemplaza con tu API Key de TMDB
const apiUrl = 'https://api.themoviedb.org/3/search/movie?api_key=68959a0a6c35f6870e29294220e06053&query=';

let genreMap = {};

async function getGenres() {
    try {
      const response = await axios.get(`${'https://api.themoviedb.org/3'}/genre/movie/list`, {
        params: {
          api_key: '68959a0a6c35f6870e29294220e06053',
          language: 'es-ES'
        }
      });
      const genres = response.data.genres;
      console.log('Géneros recibidos:', genres);
      
      genres.forEach(g => {
        genreMap[g.id] = g.name;
      });
  
      console.log('Mapeo de géneros:', genreMap);
    } catch (error) {
      console.error('Error al cargar géneros:', error);
    }
  }


// Función que realiza la búsqueda de películas
const searchMovies = async () => {
const searchInput = document.getElementById('search-input').value; // Obtener el valor del input
const movieResultsContainer = document.getElementById('movie-results'); 

    if (searchInput.trim() === '') {
        movieResultsContainer.innerHTML = ''; 
        return;
    }


    // Realizamos la llamada a la API
    const response = await fetch(apiUrl + searchInput);
    const data = await response.json();

  
    movieResultsContainer.innerHTML = '';

    if (data.results && data.results.length > 0) {
      
        data.results.forEach(movie => {
          const genreNames = movie.genre_ids.map(id => genreMap[id] || 'Desconocido').join(', ');
            
          const movieCard= `
            <div class="col-md-4">
                <div class="card">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">
                    <div class="card-body">
                        <h5 class="card-title">${movie.title}</h5>
                        <p class="card-text">${movie.overview}</p>
                        <p class="card-text">Géneros: ${genreNames}</p>
                       
                    </div>
                </div>
            </div>
            `;
            movieResultsContainer.innerHTML += movieCard; 
        });
    } else {
        movieResultsContainer.innerHTML = '<p>No se encontraron películas con ese nombre.</p>';
    }
};

// Agregar un evento para realizar la búsqueda cuando el usuario presione Enter
document.getElementById('search-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchMovies();
    }
});


window.onload = getGenres ;