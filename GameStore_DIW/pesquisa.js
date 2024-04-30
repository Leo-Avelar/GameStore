const apiKey = `c8480a13dcac4dfaa44b8283eb7f0bc7`
let searchedGame = document.getElementById("txtPesquisa")
let searchButton = document.getElementById("btnPesquisa")
let id = ''

document.body.onload = () => {
    let params = new URLSearchParams(document.location.search);
    id = params.get("search");

    searchButton.addEventListener("click", search)

    let url = `https://api.rawg.io/api/games?key=${apiKey}&search=${id}`

    fetch(url)
        .then(dados => dados.json())
        .then(dados => showSearchGames(dados))
}

function showSearchGames(dados){
    console.log(dados);
    let html1 = ''
    let html2 = ''
    let resultados = dados.results
    console.log(resultados)

        html1 +=`
            <h1 class="nomePesquisado"> ${id} </h1>
            <h3 class="jogosEncontrados"> Jogos encontrados: </3>
        `
    resultados.forEach(
        dados => {

            let plataformas = ''

            if (dados.platforms) { // verifica se é != null
                for (let j = 0; j < dados.platforms.length; j++) {
                    plataformas += dados.platforms[j].platform.name
                    if (j < dados.platforms.length - 1) {
                        plataformas += ' | ';
                    }
                }
            }
            else{
                plataformas = "Plataformas desconhecidas"
            }

            let generos = ''
            if (dados.generos) {   
                for (let j = 0; j < dados.genres.length; j++) {
                    generos += dados.genres[j].name
                    if (j < dados.genres.length - 1) {
                        generos += ' | ';
                    }
                }
            }
            else{
                generos = "Desconhecidos"
            }
            html2 += `

                <div class=" cJogo col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6">
                    <div class="card text-bg-dark" width="100%">
                        <img src="${dados.background_image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h4 class="card-title">${dados.name}</h4>
                            <p class="card-text plat">${plataformas}</p>
                            <p class="card-text plat">Gêneros: ${generos}</p>
                            <p class="card-text plat">Avaliação: ${dados.rating}</p>
                            <a href="./detalhes.html?id=${dados.id}" class="btn btn-outline-secondary">Mais detalhes...</a>
                        </div>
                    </div>
                </div>
            `
        }
    );

    document.getElementById("titulo").innerHTML = html1
    document.getElementById("jogosBuscados").innerHTML = html2
}

function search(event){
    event.preventDefault() //evita que a página seja recarregada
    window.open(`pesquisa.html?search=${searchedGame.value}`)
}
