$(document).ready(() => {
  //-------------------------PRELOADER-----------------

  // hide preloader when everthing in the document load
  $(window).on("load", e => {
    $("#preloader").fadeOut(1500, e => {
      this.remove();
    });
  });
  // ----------------------------PRELOADER-------------

  $("#searchForm").on("submit", e => {
    let searchText = $("#searchText").val();
    getMovies(searchText);
    e.preventDefault();
  });

  function getMovies(searchText) {
    axios
      .get(`http://www.omdbapi.com?apikey=854c3125&s=${searchText}`)
      .then(response => {
        let movies = response.data.Search;
        let output = "";
        $.each(movies, (index, movie) => {
          output += `
			  <div class="col-md-3 col-sm-4 col-xs-6 col-xs-offset-3">
				 <div class="well text-center flex">
					<img src="${movie.Poster}">
					<h5 class="flex-item">${movie.Title}</h5>
					<button onclick="movieSelected('${
            movie.imdbID
          }')" class="btn btn-primary" href="#">Movie Details</button>
				 </div>
			  </div>
			`;
        });

        $("#movies").html(output);
      })
      .catch(err => {
        console.log(err);
      });
  }

  const movieSelected = function(id) {
    sessionStorage.setItem("movieID", id);
    window.location = "movie.html";
    return false;
  };

  function getMovie() {
    let movieID = sessionStorage.getItem("movieID");

    axios
      .get(`http://www.omdbapi.com?apikey=854c3125&i=${movieID}`)
      .then(res => {
        let movie = res.data;
        let output = `
			<div class="row">
			<div class="col-md-4">
				<img src="${movie.Poster}" alt="" class="thumbnail">
			</div>
			<div class="col-md-8">
				<h2>${movie.Title}</h2>
				<ul class="list-group">
					<li class="list-group-item"><strong>Year: </strong>${movie.Year}</li>
					<li class="list-group-item"><strong>Country: </strong>${movie.Country}</li>
					<li class="list-group-item"><strong>Director: </strong>${movie.Director}</li>
					<li class="list-group-item"><strong>Actors: </strong>${movie.Actors}</li>
					<li class="list-group-item"><strong>Genre: </strong>${movie.Genre}</li>
					<li class="list-group-item"><strong>Imdb rating: </strong>${
            movie.imdbRating
          }</li>
					<li class="list-group-item"><strong>Metascore: </strong>${movie.Metascore}</li>
					<li class="list-group-item"><strong>Awards: </strong>${movie.Awards}</li>
				</ul>
			</div>
		</div>
		<div class="row">
		<div class="well">
		<h3>Plot</h3>
		<p>${movie.Plot}</p>
		<hr>
		<a target='_blank' class="btn btn-primary" href="http://imdb.com/title/${
      movie.imdbID
    }">Go IMDB</a>
		<a class="btn btn-primary" href="index.html">Go back to search</a>
		</div>
		</div>
			`;
        $("#movies").html(output);
      })
      .catch(err => {
        console.log(err);
      });
  }
});
