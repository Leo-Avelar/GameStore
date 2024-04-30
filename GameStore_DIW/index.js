const apiKey = `c8480a13dcac4dfaa44b8283eb7f0bc7`

//Places HTML:
const gamesPlace = document.getElementById("gamesPlace")
const generosPlace = document.getElementById("generosPlace")
const filterPlace = document.getElementById("filterPlace")

// Search:
const searchedGame = document.getElementById("txtPesquisa")
const searchButton = document.getElementById("btnPesquisa")

// Format:
const pageSize = 8
const pageSize2 = 4

//Filter HTML:
const genreHtmlID = document.getElementById("opcoesGenero")
const platformHtmlID = document.getElementById("opcoesPlataforma")
const storeHtmlID = document.getElementById("opcoesLoja")

document.body.onload = () => {
    listAllGames()
    getFilterOptions()
    listGenresCards()

    searchButton.addEventListener("click", search)

    genreHtmlID.addEventListener("change", listGamesByFilter)
    platformHtmlID.addEventListener("change", listGamesByFilter)
    storeHtmlID.addEventListener("change", listGamesByFilter)
}

function listAllGames(page) { //Destaque
    if (!page) page = 1
    let url = `https://api.rawg.io/api/games?key=${apiKey}&page=${page}&page_size=${pageSize}`

    fetch(url)
        .then(data => data.json())
        .then(
            data => {
                showGames(data)

                nextOrPrevious(page, "listAllGames", "proximo", "anterior", data.next)
            }
        )
}

function showGames(dados) {
    let html = ''
    let resultados = dados.results

    resultados.forEach(
        jogo => {

            let plataformas = ''

            if (jogo.platforms) {
                for (let j = 0; j < jogo.platforms.length; j++) {
                    plataformas += jogo.platforms[j].platform.name
                    if (j < jogo.platforms.length - 1) {
                        plataformas += ' | ';
                    }
                }
            }
            else {
                plataformas = "Plataformas desconhecidas"
            }

            let generos = ''
            if (jogo.genres) {
                for (let j = 0; j < jogo.genres.length; j++) {
                    generos += jogo.genres[j].name
                    if (j < jogo.genres.length - 1) {
                        generos += ' | ';
                    }
                }
            }
            else {
                generos = "Desconhecidos"
            }

            html += `
                <div class=" cJogo col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6">
                    <div class="card text-bg-dark" width="100%">
                        <img src="${jogo.background_image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h4 class="card-title">${jogo.name}</h4>
                            <p class="card-text plat">${plataformas}</p>
                            <p class="card-text plat">Gêneros: ${generos}</p>
                            <p class="card-text plat">Avaliação: ${jogo.rating}</p>
                            <a href="./detalhes.html?id=${jogo.id}" class="btn btn-outline-secondary">Mais detalhes...</a>
                        </div>
                    </div>
                </div>
                `
        }
    )
    gamesPlace.innerHTML = html;
}

// Filter options =======================================

function getFilterOptions() {
    getOptions(`https://api.rawg.io/api/genres?key=${apiKey}`, 'Todos os gêneros', genreHtmlID)
    getOptions(`https://api.rawg.io/api/platforms?key=${apiKey}`, 'Todas as plataformas', platformHtmlID)
    getOptions(`https://api.rawg.io/api/stores?key=${apiKey}`, 'Todas as lojas', storeHtmlID)

}

function getOptions(url, defaultText, htmlID) {
    fetch(url)
        .then(data => data.json())
        .then(
            data => {

                let html = ''
                let results = data.results

                html = `<option value="0">${defaultText}</option>`

                results.forEach(
                    option => {
                        html += `<option value="${option.id}">${option.name}</option>`
                    }
                );
                htmlID.innerHTML = html
            }
        )
}

function listGamesByFilter(){
    let page = 1
    let url = `https://api.rawg.io/api/games?key=${apiKey}&page=${page}&page_size=${pageSize}`
    
    if (genreHtmlID.value != 0) {
        url += `&genres=${genreHtmlID.value}`
    }

    if (platformHtmlID.value != 0) {
        url += `&platforms=${platformHtmlID.value}`
    }
    
    if (storeHtmlID.value != 0){
        url += `&stores=${storeHtmlID.value}`
    }
    listGames(1,url)
}

function listGames(page, url) {
    if (!page) page = 1

    fetch(url)
        .then(dados => dados.json())
        .then(
            dados => {
                showGames(dados)
                nextOrPrevious(page, "listGames", "proximo", "anterior", dados.next)
            }
        )
}

//=======================================================

function nextOrPrevious(page, funct, nextID, previousID, dataNext) {
    let next = ""
    let prev = ""

    if (page > 1) {
        prev = `<button onclick="${funct}(${page - 1})" id="carregar" type="button" class="btn btn-outline-light"> Anterior</button>`
    }

    if (dataNext != null) {
        next = `<button onclick="${funct}(${page + 1})" id="carregar" type="button" class="btn btn-outline-light"> Próximo</button>`
    }

    document.getElementById(`${previousID}`).innerHTML = prev
    document.getElementById(`${nextID}`).innerHTML = next
}


// Genres cards ===================================
function listGenresCards(page) {
    if (!page) page = 1
    let url = `https://api.rawg.io/api/genres?key=${apiKey}&page=${page}&page_size=${pageSize2}`

    fetch(url)
        .then(dados => dados.json())
        .then(
            dados => {
                showGenresCards(dados)
                nextOrPrevious(page, "listGenresCards", "proximoGen", "anteriorGen", dados.next)
            }
        )
}

function showGenresCards(dados) {
    let html = ''
    let resultados = dados.results

    resultados.forEach(
        dados => {

            let nomeJogos = ''
            for (let j = 0; j < dados.games.length; j++) {
                nomeJogos += `<li>${dados.games[j].name}</li>`
            }

            html += `
                <div class=" cdados col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6">
                    <div class="card text-bg-dark" width="100%">
                        <img src="${dados.image_background}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h3 class="card-title">${dados.name}</h3>
                            <h5>Jogos destaque: </h5> 
                            <ul> ${nomeJogos}</ul>
                        </div>
                    </div>
                </div>
                `
        }
    )
    generosPlace.innerHTML = html;
}
// ================================================
  
// Search ================
function search(event) {
    event.preventDefault() //evita que a página seja recarregada
    window.open(`pesquisa.html?search=${searchedGame.value}`)
}
// =======================

