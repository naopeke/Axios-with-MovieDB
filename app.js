let page = 1;
const btnPrevious = document.getElementById('btnPrevious');
const btnNext = document.getElementById('btnNext');

btnPrevious.addEventListener('click', () => {
	if(page > 1){
		page -= 1;
		loadMovies();
	}
});

btnNext.addEventListener('click', () => {
	if(page < 1000){
		page += 1;
		loadMovies();
	}
});

const loadMovies = async() => {
	try {
		// Hay que esperar que se acabe fetch antes de obtener response. cuando se acabe, siguiente linea
		// language : language=es-ES
		// EndPoint: GET /movie/popular
		const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=en-US&page=${page}`);
	
		console.log(response);

		// Si la response es ok
		if(response.status === 200){
			const data = await response.json();
			console.log(data.results);
			
			let movies = '';
			data.results.forEach(movie => {
				console.log(movie.title);
				movies += `
					<div class="movie">
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
						<h3 class="title">${movie.title}</h3>
					</div>
				`;
			});

			document.getElementById('container').innerHTML = movies;

		// error 401
		} else if(response.status === 401){
			console.log('API key error');
		// error 404
		} else if(response.status === 404){
			console.log('Does not exist this movie');
		// otros errores
		} else {
			console.log('Error');
		}

	} catch(error){
		console.log(error);
	}

}

loadMovies();