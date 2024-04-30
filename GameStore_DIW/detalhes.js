const apiKey = `c8480a13dcac4dfaa44b8283eb7f0bc7`
let searchedGame = document.getElementById("txtPesquisa")
let searchButton = document.getElementById("btnPesquisa")

const namePlace = document.getElementById("namePlace")
const informationPlace = document.getElementById("informationPlace")
const imageCarouselPlace = document.getElementById("imageCarouselPlace")
const videoCarouselPlace = document.getElementById("videoCarouselPlace")
const descriptionPlace = document.getElementById("descriptionPlace")

document.body.onload= () => {
    let params = new URLSearchParams(document.location.search);
    let id = params.get("id");

    getGameInformation(id)
    CarouselVideos(id)
    CarouselScreenshots(id)

    searchButton.addEventListener("click", search)
}


function getGameInformation(id) {
    let url = `https://api.rawg.io/api/games/${id}?key=${apiKey}`

    fetch(url)
        .then(dados => dados.json())
        .then(
            dados => {
                getName(dados)
                getInformations(dados)
                getDescription(dados)
            }
        )
}

function getName(dados) {
    let html = `<h1 class="titulo">${dados.name}</h1>`
    namePlace.innerHTML = html
}

function getInformations(dados) {
    let informations = ""

    let plataformas = ''
    if (dados.platforms != "") {
        for (let i = 0; i < dados.platforms.length; i++) {
            plataformas += dados.platforms[i].platform.name
            if (i < dados.platforms.length - 1) {
                plataformas += ' | '
            }
        }
    }
    else {
        plataformas = "Plataformas Desconhecidas"
    }

    let generos = ''
    if (dados.genres != "") {
        for (let j = 0; j < dados.genres.length; j++) {
            generos += dados.genres[j].name
            if (j < dados.genres.length - 1) {
                generos += ' | '
            }
        }
    }
    else {
        generos = "Gêneros Desconhecidos"
    }

    let publiclicadoras = ''
    if (dados.publishers != "") {
        for (let k = 0; k < dados.publishers.length; k++) {
            publiclicadoras += dados.publishers[k].name
            if (k < dados.publishers.length - 1) {
                publiclicadoras += ' | '
            }
        }
    }
    else {
        publiclicadoras = "Publicadoras Desconhecidas"
    }

    let lojas = ''
    if (dados.stores != "") {
        for (let k = 0; k < dados.stores.length; k++) {
            lojas += dados.stores[k].store.name
            if (k < dados.stores.length - 1) {
                lojas += ' | '
            }
        }
    }
    else {
        lojas = "Lojas Desconhecidas"
    }

    informations += `    
    <div class = 'container-fluid'>
        <div class = 'row'>
            <div class = 'col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12'>
                <img src="${dados.background_image}" class="card-img-top" alt="Imagem do jogo">
            </div>
            <div class = 'col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12'>

                <div class="info">
                    <h3 class="info"> Plataformas:</h3>
                    <p class="dado">${plataformas}</p>
                </div>

                <div class="info">
                    <h3 class="info"> Gêneros:</h3>
                    <p class="dado">${generos}</p>
                </div>

                <div class="info">
                    <h3 class="info"> Lojas:</h3>
                    <p class="dado">${lojas}</p>
                </div>       

                <div class="info">
                    <h3 class="info"> Publicadoras:</h3>
                    <p class="dado">${publiclicadoras}</p>
                </div>

                <div class="info">
                    <h3 class="info"> Avaliação:</h3>
                    <p class="dado">${dados.rating}</p>
                </div>
                
            </div>
        </div>
    </div>
    `
    informationPlace.innerHTML = informations
}

function getDescription(dados) {
    let html =
    `
    <div class = "container-fluid">
        <div class = "col-12">
            <div class = "row descricao">
                <h3 class ="info">Descrição: </h3>
                <p>${dados.description}</p>
            </div>
        </div>
    </div>
    `
    descriptionPlace.innerHTML = html
}

function CarouselVideos(id) {
    let url = `https://api.rawg.io/api/games/${id}/movies?key=${apiKey}`

    fetch(url)
        .then(dados => dados.json())
        .then(
            dados => {
                if (dados.results != "") {
                    let videos = getVideos(dados.results)
                    getCarouselInfo(dados.results, videos, videoCarouselPlace, "videos")
                }
            }
        )
}

function CarouselScreenshots(id) {
    let url = `https://api.rawg.io/api/games/${id}/screenshots?key=${apiKey}`

    fetch(url)
        .then(dados => dados.json())
        .then(
            dados => {
                if (dados.results != "") {
                    let images = getImages(dados.results)
                    getCarouselInfo(dados.results, images, imageCarouselPlace, "images")
                }
            }
        )
}

function getCarouselInfo(dados, content, htmlPlace, targetName) {
    html = ""

    html +=
    `
    <div id="${targetName}" class="carousel slide" data-bs-ride="true">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#${targetName}" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    `
    for (let i = 1; i<dados.length; i++) {
        html += `<button type="button" data-bs-target="#${targetName}" data-bs-slide-to="${i}" aria-label="Slide ${i + 1}"></button>`
    }
    html += `</div>`


    html += `<div class="carousel-inner">`
    html += content
    html += `</div>`

    html += `    
            <button class="carousel-control-prev" type="button" data-bs-target="#${targetName}" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#${targetName}" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
            </button>
        </div>
        `
    htmlPlace.innerHTML = html
}

function getVideos(dados) {
    let html = ""
    let first = true
    dados.forEach(
        jogo => {
            if (first == true) {
                html +=
                    `
                <div class="carousel-item active">
                    <iframe width="100%" height="315" src="${jogo.data.max}" alt="..."
                    title="video" frameborder="0"
                    allowfullscreen></iframe>
                </div>
                `
                first = false
            }
            else {
                html +=
                    `
                <div class="carousel-item">
                    <iframe width="100%" height="315" src="${jogo.data.max}" alt="..."
                    title="video" frameborder="0"
                    allowfullscreen></iframe>
                </div>
                `
            }    
        }
    )
    return html
}

function getImages(dados) {
    let html = ""
    let first = true
    dados.forEach(
        jogo => {
            if (first == true) {
                html +=
                `
                <div class="carousel-item active carouselImage">
                    <img src="${jogo.image}" width="60%" height="315" alt="...">
                </div>
                `
                first = false
            }
            else {
                html +=
                    `
                <div class="carousel-item carouselImage">
                    <img src="${jogo.image}" width="60%" height="315" alt="...">
                </div>
                `
            }
        }
    )
    return html
}

function search(event) {
    event.preventDefault(); // evita que a página seja recarregada
    window.open(`pesquisa.html?search=${searchedGame.value}`)
}