const ingredientsAndMeasuresList = (dataObject, strParam) => {
  const strKeys = Object.keys(dataObject).filter((key) => key.includes(strParam));
  const strValues = strKeys.reduce((acc, curr) => ([...acc, dataObject[curr]]), []);
  const strValuesFiltered = strValues.filter((item) => !!item && item !== ' ');
  return strValuesFiltered;
};

export default ingredientsAndMeasuresList;
