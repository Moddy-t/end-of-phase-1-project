// API key (replace with your actual Spoonacular API key)
//const API_KEY = 'your_api_key_here';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultsSection = document.getElementById('results');
const toggleModeButton = document.getElementById('toggleMode');


// Event Listeners
searchButton.addEventListener('click', searchRecipes);
toggleModeButton.addEventListener('click', toggleDarkMode);
searchInput.addEventListener('keydown', handleEnterKey);

// Global variables
let allRecipes = [];

// Functions to fetch data from db
function searchRecipes() {
    const query = searchInput.value;
    function fetchData() {
        fetch('db.json')
            .then(response => response.json())
            .then(data => {
                recipe.data(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }
    displayRecipes(allRecipes);
}

function displayRecipes(recipes) {
    resultsSection.innerHTML = '';
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
        `;
        resultsSection.appendChild(recipeCard);


    });

    // create pop up function
    pop_up.forEach(element => {
        // create a pop_up card for the body
        const pop_up = document.create.element('div');
        pop_up.classList.add('pop card');

        //create element for the heading h1
        const title = document.createElement('h1');
        title.textContent = element.title;
        pop_up.appendChild(title);

        //create element for ingridients
        const ingredients = document.createElement('p');
        ingredients.textContent = element.ingredients;
        pop_up.appendChild(p);

        //create element for instructions
        const instructions = document.createElement('p');
        instructions.textContent = element.instructions;
        pop_up.appendChild(p);

        // create element for prep time
        const preparation_time = document.createElement('p');
        preparation_time.textContent = `Prep time: ${element.preparation_time}`;
        pop_up.appendChild(p);

        //create element for cook time
        const cook_time = document.createElement('p');
        cook_time.textContent = `Cook time: ${element.cook_time}`;
        pop_up.appendChild(p);

        //create element for total time
        const total_time = document.createElement('p');
        total_time.textContent = `cook time; ${element.preparation_time + element.cook_time}`;
        pop_up.appendChild(p);

        //create element for yield
        const yield = document.createElement('p');
        yield.textContent = element.yield;
        pop_up.appendChild(p);

        //create element for allergen info

        const allergen = document.createElement('p');
        allergen.textContent = element.allergen;
        pop_up.appendChild(p);

        // create element for storage info 
        const storage = document.createElement('p');
        storage.textContent = element.storage;
        pop_up.appendChild(p);

        //create element for tips 
        const tips = document.createElement('p');
        tips.textContent = element.tips;
        pop_up.appendChild('p');
    })

}
 
// create a function for the dark/light mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

//  event lister for the eneter key to perform the search function
function handleEnterKey(event) {
    if (event.key === 'Enter') {
        searchRecipes();
    }
}