//then & catch
axios.get('https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-ES')
	.then((response) => {
		console.log('Axios works');
		console.log(response);
		// con axios, no hace falta .json 
		console.log(response.data);
		console.log(response.data.results);
		console.log(response.data.results[1].title); //titulo de la segundo movie
	})
	.catch((error) => {
		console.log(error);
	})


//async & await
const getMovies = async() => {
	try {
		const response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-ES', {
			params: {
				api_key: ''
			}
		})
	
		console.log(response);
	} catch (error) {
		console.log(error);
	}
}
getMovies();

//---------------------------------------------------------------------

let page = 1;
let movies = '';
let latestMovie;

// Creamos el observer
let observer = new IntersectionObserver((entries, observer) => {
	console.log(entries);

	entries.forEach(entry => {
		if(entry.isIntersecting){
			page++;
			loadMovies();
		}
	});
}, {
	rootMargin: '0px 0px 200px 0px',
	threshold: 1.0
});


const loadMovies = async() => {
	try {
		const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
			params: {
				// api_key: '192e0b9821564f26f52949758ea3c473',
				language: 'es-ES',
				page: page
			},
			headers: {
				//token
				'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTJlMGI5ODIxNTY0ZjI2ZjUyOTQ5NzU4ZWEzYzQ3MyIsInN1YiI6IjYxODQyMWZlOGVkMDNmMDAyZDA4ZjZlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nrCdKCx2dZQ7d0WaJpXJaPO_De2iP2rYg9bPon1O3V0'
			}
		})

		// const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${page}`);
	
		// console.log(response);

		// Si la response es correcta
		if(response.status === 200){

			// se hace falta usar response.json => response.data
			response.data.results.forEach(movie => {
				movies += `
					<div class="movie">
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
						<h3 class="titulo">${movie.title}</h3>
					</div>
				`;
			});

			document.getElementById('container').innerHTML = movies;

			if(page < 1000){
				if(latestMovie){
					observer.unobserve(latestMovie);
				}
	
				const peliculasEnPantalla = document.querySelectorAll('.container .movie');
				latestMovie = peliculasEnPantalla[peliculasEnPantalla.length - 1];
				observer.observe(latestMovie);
			}

		} else if(response.status === 401){
			console.log('Pusiste la llave mal');
		} else if(response.status === 404){
			console.log('La movie que buscas no existe');
		} else {
			console.log('Hubo un error y no sabemos que paso');
		}

	} catch(error){
		console.log(error);
	}

}

loadMovies();