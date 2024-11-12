// URL da imagem de Pokébola
const pokeballImageUrl = "pokebola.png"; // Imagem da Pokébola

// Lista de Pokémon com imagens e cores de fundo
const pokemonCards = [
    { image: "https://img.pokemondb.net/sprites/sword-shield/icon/pikachu.png", color: "#FFD700" },
    { image: "https://img.pokemondb.net/sprites/sword-shield/icon/pikachu.png", color: "#FFD700" },
    { image: "https://img.pokemondb.net/sprites/sword-shield/icon/bulbasaur.png", color: "#98FB98" },
    { image: "https://img.pokemondb.net/sprites/sword-shield/icon/bulbasaur.png", color: "#98FB98" },
    { image: "https://img.pokemondb.net/sprites/sword-shield/icon/charmander.png", color: "#FF4500" },
    { image: "https://img.pokemondb.net/sprites/sword-shield/icon/charmander.png", color: "#FF4500" },
    { image: "https://img.pokemondb.net/sprites/sword-shield/icon/squirtle.png", color: "#87CEEB" },
    { image: "https://img.pokemondb.net/sprites/sword-shield/icon/squirtle.png", color: "#87CEEB" },
    { image: "https://img.pokemondb.net/sprites/sword-shield/icon/jigglypuff.png", color: "#FFB6C1" },
    { image: "https://img.pokemondb.net/sprites/sword-shield/icon/jigglypuff.png", color: "#FFB6C1" },
    { image: "https://img.pokemondb.net/sprites/sword-shield/icon/meowth.png", color: "#F5DEB3" },
    { image: "https://img.pokemondb.net/sprites/sword-shield/icon/meowth.png", color: "#F5DEB3" },
    { image: "https://img.pokemondb.net/sprites/sword-shield/icon/snorlax.png", color: "#2F4F4F" },
    { image: "https://img.pokemondb.net/sprites/sword-shield/icon/snorlax.png", color: "#2F4F4F" },
    { image: "https://img.pokemondb.net/sprites/sword-shield/icon/psyduck.png", color: "#FFFFE0" },
    { image: "https://img.pokemondb.net/sprites/sword-shield/icon/psyduck.png", color: "#FFFFE0" },
    { image: "https://img.pokemondb.net/sprites/sword-shield/normal/sylveon.png", color:"#FCB9FF" }, 
    { image: "https://img.pokemondb.net/sprites/sword-shield/normal/sylveon.png", color:"#FCB9FF" },
];

let flippedCards = [];
let matchedCards = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard() {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = "";
    const shuffledCards = shuffle([...pokemonCards]);

    shuffledCards.forEach((pokemon, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.image = pokemon.image;
        card.dataset.color = pokemon.color;
        card.dataset.index = index;

        // Imagem da Pokébola que aparece inicialmente
        const pokeball = document.createElement("img");
        pokeball.src = pokeballImageUrl;
        pokeball.classList.add("pokeball");
        card.appendChild(pokeball);

        // Imagem do Pokémon (escondida até a carta ser virada)
        const pokemonImg = document.createElement("img");
        pokemonImg.src = pokemon.image;
        pokemonImg.classList.add("pokemon-image");
        card.appendChild(pokemonImg);

        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length === 2 || this.classList.contains("flip") || this.classList.contains("matched")) return;

    this.classList.add("flip");
    this.style.backgroundColor = this.dataset.color;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.image === card2.dataset.image) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedCards += 2;

        if (matchedCards === pokemonCards.length) {
            setTimeout(() => alert("Parabéns! Você venceu!"), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove("flip");
            card1.style.backgroundColor = "";
            card2.classList.remove("flip");
            card2.style.backgroundColor = "";
        }, 1000);
    }
    flippedCards = [];
}

document.getElementById("reset-btn").addEventListener("click", () => {
    matchedCards = 0;
    flippedCards = [];
    createBoard();
});

createBoard();
