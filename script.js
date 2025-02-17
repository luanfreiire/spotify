// App JS Spotify Imersão Front End//

// Btn Pesquisar SideBar//
btn_pesquisar = () => {
    let input_pesquisa = document.getElementById("input_search");
    let bx_input = document.querySelector(".header_search");

    input_pesquisa.select();
    bx_input.style.boxShadow = "4px 4px 10px #404040"; //Destaca o input com BoxShadow//

    input_pesquisa.addEventListener("blur", () => {
        bx_input.style.boxShadow = "none"; //Remove o BoxShadow//
    })
}

//Pesquisa Dinamica//

//.Json, Estrutura do resultado da Busca//

const results_content = document.getElementById("results_content");
const input_search = document.getElementById("input_search");

//.json//
fetch("database/artists.json")
    .then(response => response.json())
    .then(data => {
        const all_artists = data.artists;

        input_search.addEventListener("input", () => {
            const search_term = input_search.value.toLowerCase();
            results_content.innerHTML = "";

            //Busca Dinamica//
            if (search_term === "") {
                document.getElementById("hidden_view").style.display = "block";
                results_content.style.display = "none";
                return;
            } else {
                document.getElementById("hidden_view").style.display = "none";
                results_content.style.display = "block";
            }

            //Filtro da Busca//
            const filter_artists = all_artists.filter(artist => {
                const artist_name = artist.name.toLowerCase();
                const artist_genre = artist.genre.toLowerCase();
                return artist_name.includes(search_term) || artist_genre.includes(search_term);
            });

            filter_artists.forEach(artist => {
                const html_injection = `
                    <div class="cards_results">
                        <img src="${artist.urlImg}" alt="${artist.name}">
                        <h2>${artist.name}</h2>
                        <h3>${artist.genre}</h3>
                    </div>
                `;
                results_content.insertAdjacentHTML("beforeend", html_injection);
                results_content.style.display = "grid";
                results_content.style.gridTemplateColumns = "1fr 1fr 1fr";
            });

            if (filter_artists.length === 0) {
                results_content.innerHTML = "<p>Nenhum artista encontrado.</p>";
            }

        });
    })

    //Caso de Erro no .json//
    .catch(error => {
        console.error("Erro ao carregar o JSON:", error);
        results_content.innerHTML = "<p>Erro ao carregar os dados.</p>";
    });

//Saudação, Bom dia, Boa Tarde, Boa Noite//
const greeting_h1 = document.querySelector("#greeting h1");
const greeting_icon = document.querySelector("#greeting span");

uptade_greeting = () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 5 && hour < 12) {
        greeting_h1.textContent = "Bom dia";
        greeting_icon.className = "bi bi-cloud-sun-fill";

    } else if (hour >= 12 && hour < 18) {
        greeting_h1.textContent = "Boa tarde";
        greeting_icon.className = "bi bi-cloud-sun-fill";

    } else {
        greeting_h1.textContent = "Boa noite";
        greeting_icon.className = "bi bi-moon-stars-fill";
    }
}

uptade_greeting();
setInterval(uptade_greeting, 60000);

// Fechar Footer ("testar premium") //

close_footer = () => {
    const bg_footer = document.getElementById("bg_footer");

    bg_footer.style.display = "none";
}

//RESULTADOS DE ARTISTAS ESTOURANDO A PÁGINA !!!!!!!!!!!!!!//
//TAMANHO DAS IMAGENS DO RESULTADO PEQUENAS//
