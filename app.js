// page : present page number 
let page = 1;
// HTML code
let movies = '';
// the latest movie 
let latestMovie;

// Creamos el observer
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
//let callback = (entries, observer) => {
	// entries.forEach((entry) => {
	//   });
	// };
	
let observer = new IntersectionObserver((entries, observer) => {
	console.log(entries);

	entries.forEach(entry => {
		//si hay entry y están dentro de la pantalla (viewport) , carga la pagina
		if(entry.isIntersecting){
			page++;
			loadMovies();
		}
	});
}, {
	// 200px es para se cargue cuando están dentro de la pantalla
	rootMargin: '0px 0px 200px 0px',
	threshold: 1.0
});


const loadMovies = async() => {
	try {
		const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${page}`);
	
		// console.log(response);

		// Si la response es correcta
		if(response.status === 200){
			const data = await response.json();
			
			data.results.forEach(movie => {
				movies += `
					<div class="movie">
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
						<h3 class="titulo">${movie.title}</h3>
					</div>
				`;
			});

			document.getElementById('container').innerHTML = movies;

			if(page < 1000){
				// si hay ultima pelicula, dejo de observar
				if(latestMovie){
					observer.unobserve(latestMovie);
				}
	
				const movieOnScreen = document.querySelectorAll('.container .movie');
				console.log(movieOnScreen);

				latestMovie = movieOnScreen[movieOnScreen.length - 1];
				console.log(latestMovie);
				// quiero que vigile la ultima pelicula
				observer.observe(latestMovie);
			}

		} else if(response.status === 401){
			console.log('API key error');
		} else if(response.status === 404){
			console.log('Does not exist this movie');
		} else {
			console.log('Error');
		}

	} catch(error){
		console.log(error);
	}

}

loadMovies();