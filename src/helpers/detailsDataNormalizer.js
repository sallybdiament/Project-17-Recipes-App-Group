const normalizeIgredientsAndMeasuresToList = (dataObject, strParam) => {
  const listOfstr = Object.keys(dataObject).filter((key) => (key
    .includes(strParam)))
    .filter((key) => ((dataObject[key] !== ' ')
    && (dataObject[key] !== '') && (dataObject[key] !== null)))
    .map((key) => ({ [key]: dataObject[key] }));
  return listOfstr;
};

export default normalizeIgredientsAndMeasuresToList;
