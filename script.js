const divHeroesList = document.querySelector(".heroes-list");
const divHeroesInfo = document.querySelector(".heroes-info");
const divLetters = document.querySelector(".bar-letters");

const API_KEY = 'ae53d866c9ba789e3500758137ac5bc0';
const API_HASH = 'a51cd318611852ed3f914062aec34cc0';

const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
let letter = alphabet[0];

const btnLetters = () => {
    alphabet.forEach(l => {
        let button = document.createElement("button");
        button.classList.add('btn');
        button.textContent = l;
        button.addEventListener('click', () => {
            letter = l;
            document.querySelector(".btn-active").classList.remove("btn-active");
            button.classList.add('btn-active');
            divHeroesInfo.style.display = "none";
            getHeros();
        });
        divLetters.appendChild(button);
    });
    document.querySelector(".btn").classList.add("btn-active");
}

const getHeros = async () => {
    try {
        divHeroesList.innerHTML = "";
        const response = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=1&limit=100&nameStartsWith=${letter}&apikey=${API_KEY}&hash=${API_HASH}`);
        let heros = await response.json();
        console.log(heros);
        divHeroesList.style.width = 240 * heros.data.results.length + "px";
        heros.data.results.forEach(hero => {
            let heroElement = document.createElement("div");
            heroElement.classList.add('heroe-panel');
            heroElement.style.backgroundImage = `url(${hero.thumbnail.path}.${hero.thumbnail.extension})`;
            let heroName = document.createElement("p");
            heroName.textContent = hero.name;
            heroName.classList.add("hero-name");
            heroElement.addEventListener('mouseover', () => {
                heroName.style.backgroundColor = 'black';
            });
            heroElement.addEventListener('mouseout', () => {
                heroName.style.backgroundColor = '#ED1D24';
            });
            heroElement.addEventListener('click', () => {
                getHero(hero)
            });
            heroElement.appendChild(heroName);
            divHeroesList.appendChild(heroElement);
        });
    } catch (err) {
        throw new Error(err);
    }
}

const getHero = async (hero) => {
    try {
        divHeroesInfo.innerHTML = "";
        divHeroesInfo.style.display = 'grid';

        // image of heroe
        let imgElement = document.createElement('div');
        imgElement.classList.add('heroe-div-img');
        let img = document.createElement('img');
        img.classList.add('heroe-img');
        img.src = `${hero.thumbnail.path}.${hero.thumbnail.extension}`
        imgElement.appendChild(img);
        divHeroesInfo.appendChild(imgElement);

        // name of heroe
        let nameElement = document.createElement('div');
        nameElement.classList.add('heroe-div-name');
        let name = document.createElement('h1');
        name.classList.add('heroe-name');
        name.textContent = hero.name;
        nameElement.appendChild(name);
        divHeroesInfo.appendChild(nameElement);

        // description of heroe
        let descriptionElement = document.createElement('div');
        descriptionElement.classList.add('heroe-div-description');
        let description = document.createElement('p');
        description.classList.add('heroe-description');
        description.textContent = (hero.description !== "") ? hero.description : "Whoops! There is no description for this character.";
        descriptionElement.appendChild(description);
        divHeroesInfo.appendChild(descriptionElement);

    } catch (err) {
        throw new Error(err);
    }
}

window.onload = () => {
    btnLetters();
    getHeros();
}
