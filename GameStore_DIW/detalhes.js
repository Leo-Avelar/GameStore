
const apiKey = `c8480a13dcac4dfaa44b8283eb7f0bc7`
let textoPesquisa = document.getElementById("txtPesquisa")
let botaoPesquisa = document.getElementById("btnPesquisa")

document.body.onload = () => {

    let params = new URLSearchParams(document.location.search);
    let identificador = params.get("id");

    let url = `https://api.rawg.io/api/games/${identificador}?key=${apiKey}`
    let html = ''

    botaoPesquisa.addEventListener("click", pesquisar)

    fetch(url)
        .then(dados => dados.json())
        .then(
            dados => {

                let plataformas = ''
                for (let i = 0; i < dados.platforms.length; i++) {
                    plataformas += dados.platforms[i].platform.name + ' | '
                }

                let generos = ''
                for (let j = 0; j < dados.genres.length; j++) {
                    generos += dados.genres[j].name + ' | '
                }

                let publiclicadora = ''
                for (let k = 0; k < dados.publishers.length; k++) {
                    publiclicadora += dados.publishers[k].name + ' | '
                }


                html = `
                <h1 class="titulo">${dados.name}</h1>
                
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
                                <h3 class="info"> Publicadoras:</h3>
                                <p class="dado">${publiclicadora}</p>
                            </div>

                            <div class="info">
                                <h3 class="info"> Avaliação:</h3>
                                <p class="dado">${dados.rating}</p>
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div class = "container-fluid">
                    <div class = "col-12">
                        <div class = "row descricao">
                            <h3 class ="info">Descrição: </h3>
                            <p>${dados.description}</p>
                        </div>
                    </div>
                </div>
                `

                document.getElementById("informacoes").innerHTML = html
            }

        )

}

function pesquisar() {
    let texto = textoPesquisa.value
    window.open(`pesquisa.html?search=${texto}`)
}