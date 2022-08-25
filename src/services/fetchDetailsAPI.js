const fetchDetails = async (type, _id) => {
  let resp = null;
  if (type.includes('drinks')) {
    resp = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${_id}`);
  } else {
    resp = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${_id}`);
  }
  const data = resp ? await resp.json() : null;
  return data[type][0];
};

const fetchRecommended = async (type) => {
  let resp = null;
  const recommendListSize = 6;
  if (type.includes('drinks')) {
    resp = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    type = 'meals';
  } else {
    resp = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    type = 'drinks';
  }
  const data = await resp.json();
  return data[type].slice(0, recommendListSize);
};
export { fetchDetails, fetchRecommended };
