async function foodAPI(endpoint) {
  const response = await fetch(endpoint);
  const data = await response.json();
  console.log(data);
  console.log(endpoint);
  return data;
}
export default foodAPI;
