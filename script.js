// API key (replace with your actual Spoonacular API key)
// const API_KEY = 'your_api_key_here';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultsSection = document.getElementById('results');
const toggleModeButton = document.getElementById('toggleMode');

// Hide the results section initially
resultsSection.style.display = 'none';

// Event Listeners
searchButton.addEventListener('click', searchRecipes);
toggleModeButton.addEventListener('click', toggleDarkMode);
searchInput.addEventListener('keydown', handleEnterKey);

// Global variables
let allRecipes = [];

// Functions to fetch data from db
function searchRecipes() {
    const query = searchInput.value.toLowerCase(); // Convert query to lowercase for case-insensitive search
    fetchData(query);
}

function fetchData(query) {
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            // Filter recipes based on the search query
            allRecipes = data.filter(recipe => 
                recipe.title.toLowerCase().includes(query)
            );
            displayRecipes(allRecipes);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayRecipes(recipes) {
    resultsSection.innerHTML = ''; // Clear previous results
    if (recipes.length > 0) {
        resultsSection.style.display = 'block'; // Show results section if there are recipes
        recipes.forEach(recipe => {
            // Create a recipe card for each recipe
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');
            recipeCard.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.title}">
                <h3>${recipe.title}</h3>
            `;
            recipeCard.addEventListener('click', () => {
                // Create a pop-up for the clicked recipe
                const pop_up = document.createElement('div');
                pop_up.classList.add('pop-card');

                pop_up.innerHTML = `
                    <h1>${recipe.title}</h1>
                    <p>Ingredients: ${recipe.ingredients.join(', ')}</p>
                    <p>Instructions: ${recipe.instructions}</p>
                    <p>Prep time: ${recipe.preparation_time}</p>
                    <p>Cook time: ${recipe.cook_time}</p>
                    <p>Total time: ${recipe.preparation_time + recipe.cook_time}</p>
                    <p>Yield: ${recipe.yield}</p>
                    <p>Allergen info: ${recipe.allergen}</p>
                    <p>Storage info: ${recipe.storage}</p>
                    <p>Tips: ${recipe.tips}</p>
                    <button class="close-popup">Close</button>
                `;

                document.body.appendChild(pop_up);

                const closeButton = pop_up.querySelector('.close-popup');
                closeButton.addEventListener('click', () => {
                    document.body.removeChild(pop_up);
                });
            });
            resultsSection.appendChild(recipeCard);
        });
    } else {
        resultsSection.style.display = 'none'; // Hide results section if no recipes found
    }
}

// Function to toggle dark/light mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Event listener for the Enter key to perform the search function
function handleEnterKey(event) {
    if (event.key === 'Enter') {
        searchRecipes();
    }
}

// Initial data fetch
fetchData('');
