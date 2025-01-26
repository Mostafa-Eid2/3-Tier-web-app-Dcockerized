// Function to handle sorting recipes by calories
function sortByCal(event) {
  const minCal = parseInt(event.target.dataset.arg1, 10);
  const maxCal = parseInt(event.target.dataset.arg2, 10);

  // Fetch all recipe items
  const recipes = document.querySelectorAll('.recipe-item');
  recipes.forEach(recipe => {
      const calories = parseFloat(recipe.querySelector('p:nth-of-type(1)').textContent.replace('Calories: ', ''));
      if (calories >= minCal && calories <= maxCal) {
          recipe.style.display = 'block';
      } else {
          recipe.style.display = 'none';
      }
  });
}

// Function to handle sorting recipes by cooking time
function sortByTime(event) {
  const minTime = parseInt(event.target.dataset.arg1, 10);
  const maxTime = parseInt(event.target.dataset.arg2, 10);

  // Fetch all recipe items
  const recipes = document.querySelectorAll('.recipe-item');
  recipes.forEach(recipe => {
      const time = parseInt(recipe.querySelector('p:nth-of-type(2)').textContent.replace('Cooking Time: ', '').replace(' minutes', ''), 10);
      if (time >= minTime && time <= maxTime) {
          recipe.style.display = 'block';
      } else {
          recipe.style.display = 'none';
      }
  });
}

// Function to handle filtering recipes by diet type
function sortByDiet(event) {
  const dietType = event.target.dataset.arg1.toLowerCase();

  // Fetch all recipe items
  const recipes = document.querySelectorAll('.recipe-item');
  recipes.forEach(recipe => {
      const diet = recipe.querySelector('p:nth-of-type(3)').textContent.replace('Diet: ', '').toLowerCase();
      if (diet.includes(dietType)) {
          recipe.style.display = 'block';
      } else {
          recipe.style.display = 'none';
      }
  });
}

// Event listeners for sorting buttons
document.querySelectorAll('td').forEach(td => {
  td.addEventListener('click', event => {
      if (event.target.dataset.arg1 && event.target.dataset.arg2) {
          if (event.target.textContent.includes('Calories')) {
              sortByCal(event);
          } else if (event.target.textContent.includes('Time')) {
              sortByTime(event);
          } else if (event.target.textContent.includes('Diet')) {
              sortByDiet(event);
          }
      }
  });
});
