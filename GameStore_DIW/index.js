
const apiKey = `c8480a13dcac4dfaa44b8283eb7f0bc7`
let textoPesquisa = document.getElementById("txtPesquisa")
let botaoPesquisa = document.getElementById("btnPesquisa")
let gamesPlace = document.getElementById("gamesPlace")
let opcoesGenero = document.getElementById("opcoesGenero")
let generosPlace = document.getElementById("generosPlace")
const pageSize = 8
const pageSize2 = 4

document.body.onload = () => {
    listGames()
    nomeGeneros()
    listGenerosCard()

    botaoPesquisa.addEventListener("click", pesquisar)
    opcoesGenero.addEventListener("change", mudarGenero)
}

function listGames(page) {
    if (!page) page = 1
    let url = `https://api.rawg.io/api/games?key=${apiKey}&page=${page}&page_size=${pageSize}`

    fetch(url)
        .then(dados => dados.json())
        .then(
            dados => {
                showGames(dados)

                let prox = ""
                let ant = ""

                if (page > 1) {
                    ant = `<button onclick="listGames(${page - 1})" id="carregar" type="button" class="btn btn-outline-light"> Anterior</button>`
                }
                prox = `<button onclick="listGames(${page + 1})" id="carregar" type="button" class="btn btn-outline-light"> Próximo</button>`

                document.getElementById("anterior").innerHTML = ant
                document.getElementById("proximo").innerHTML = prox

            }
        )
}

function showGames(dados) {
    let html = ''
    let resultados = dados.results

    resultados.forEach(
        jogo => {

            let plataformas = ''
            for (let j = 0; j < jogo.platforms.length; j++) {
                plataformas += jogo.platforms[j].platform.name + ' | '
            }

            let generos = ''
            for (let j = 0; j < jogo.genres.length; j++) {
                generos += jogo.genres[j].name + ' | '
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

function pesquisar() {
    let texto = textoPesquisa.value
    window.open(`pesquisa.html?search=${texto}`)
}

function nomeGeneros() {

    let url = `https://api.rawg.io/api/genres?key=${apiKey}`

    fetch(url)
        .then(dados => dados.json())
        .then(
            dados => {

                let html = ''
                let resultados = dados.results

                html = `<option value="0">Todos os gêneros</option>`

                resultados.forEach(
                    dados => {

                        html += `<option value="${dados.id}">${dados.name}</option>`
                    }
                );
                document.getElementById("opcoesGenero").innerHTML = html
            }
        )
}

function mudarGenero() {
    filtro = opcoesGenero.value

    if (opcoesGenero.value != 0) {

        document.getElementById("anterior").innerHTML = ""
        document.getElementById("proximo").innerHTML = ""

        let url = `https://api.rawg.io/api/genres/${filtro}?key=${apiKey}`
        fetch(url)
            .then(dados => dados.json())
            .then(
                dados => {
                    document.getElementById("destaques").innerHTML = `${dados.name}`
                }
            )

        url = `https://api.rawg.io/api/games?key=${apiKey}&genres=${filtro}`

        fetch(url)
            .then(dados => dados.json())
            .then(dados => showGames(dados))
    }
    else {
        document.getElementById("destaques").innerHTML = `Destaques`
        listGames()
    }
}

function listGenerosCard(page){
    if (!page) page = 1
    let url = `https://api.rawg.io/api/genres?key=${apiKey}&page=${page}&page_size=${pageSize2}`

    fetch(url)
        .then(dados => dados.json())
        .then(
            dados => {
                showGenres(dados)

                let prox = ""
                let ant = ""

                if (page > 1) {
                    ant = `<button onclick="listGenerosCard(${page - 1})" id="carregar" type="button" class="btn btn-outline-light"> Anterior</button>`
                }
                prox = `<button onclick="listGenerosCard(${page + 1})" id="carregar" type="button" class="btn btn-outline-light"> Próximo</button>`

                document.getElementById("anteriorGen").innerHTML = ant
                document.getElementById("proximoGen").innerHTML = prox

            }
        )
}

function showGenres(dados) {
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