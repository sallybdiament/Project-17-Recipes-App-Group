async function foodAPI(endpoint) {
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}
export default foodAPI;
