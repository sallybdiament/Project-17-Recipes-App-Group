export const fetchRecipeDetails = async (type, id) => {
  let response = null;

  if (type.includes('drinks')) {
    response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  } else {
    response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  }

  const detailsData = response ? await response.json() : null;
  return detailsData[type][0];
};

export const fetchRecommendedRecipes = async (type) => {
  let response = null;
  const recommendListSize = 6;
  if (type.includes('drinks')) {
    response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    type = 'meals';
  } else {
    response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    type = 'drinks';
  }
  const data = await response.json();
  return data[type].slice(0, recommendListSize);
};
