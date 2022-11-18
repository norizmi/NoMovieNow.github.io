

// Mengoptimalkan penulisan kode (refactoring)
const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async function() {
    try{

        const inputKeyword = document.querySelector('.input-keyword');
        const movies = await getMovie(inputKeyword.value);
        updateUI(movies);
    } catch(err) {
        alert(err)
    }
});

// event binding
document.addEventListener('click', async function(e) {
    if(e.target.classList.contains('modal-detail-button')) {
       const imdbid = e.target.dataset.imdbid;
       const movieDetail = await getMoreDetail(imdbid);
       updateMoreDetail(movieDetail);
    }
})


function getMovie(movie) {
    return fetch('http:www.omdbapi.com/?apikey=9808d1bf&s=' + movie)
    .then(response => {
        if(!response.ok) {
            throw new Error(response.statusText);
        } else {
           return response.json();
        }
       
    })
    .then(response => {
        if(response.Response === "False") {
            throw new Error('Movie tidak ditemukan');
        } else {
           return response.Search;
        }
       
    });
}

function updateUI(card) {
     let cards = '';
     card.forEach(m => {
        cards += ShowFilm(m);
    })
    
    const moviesContainer = document.querySelector('.movies-container');
    moviesContainer.innerHTML = cards;
    
}

function getMoreDetail(detail) {
    return fetch("http://www.omdbapi.com/?apikey=9808d1bf&i=" + detail)
    .then(response => response.json())
    .then(response => response);
}

function updateMoreDetail(update) {
    const updateUi = ShowDetailFilm(update);
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = updateUi;
}


function ShowFilm(film) {
    return `<div class="col-md-4 my-3">
    <div class="card">
        <img src="${film.Poster}" class="card-img-top" alt="">
        <div class="card-body">
          <h5 class="card-title">${film.Title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${film.Year}</h6>
          <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${film.imdbID}">Detail Film</a>
        </div>
      </div>
</div>`;  
}

function ShowDetailFilm(info) {
    return `<h5 class="modal-title" id="#movieDetailModal">${info.Title}</h5>
        <div class="container-fluid">
        <div class="row">
        <div class="col-md-5">
            <img src="${info.Poster}" class="img-fluid">
        </div>
        <div class="col-md">
            <ul class="list-group">
                <li class="list-group-item"><h4>${info.Title}</h4></li>
                <li class="list-group-item"><strong>Director: ${info.Director}</strong></li>
                <li class="list-group-item"><strong>Actors: ${info.Actors}</strong></li>
                <li class="list-group-item"><strong>Writer: ${info.Writer}</strong></li>
                <li class="list-group-item"><strong>Plot: ${info.Plot}</strong></li>
              </ul>
        </div>
    </div>
</div>`; 
}
