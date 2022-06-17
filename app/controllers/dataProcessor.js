
const selectKeys = [
  "id_hh",
  "id_form",

  "id_proj",
  "iso_country_code",
  "year",

  "hfias_status",
  "fies_score"
];

//
const getRawData = (indicatorDataList) => {
  let dataList = indicatorDataList.map(indicatorData => indicatorData.data);
  let rawData = dataList.map(data => pickProperties(data, selectKeys));
  console.log(rawData.length);
  return rawData;
};
exports.getRawData = getRawData;

//
const pickProperties = (data, selecKeys) => {
  let properties = selecKeys.map(key => {
    return (key in data ? {[key] : data[key]} : {})
  });

  return properties.reduce((preResult, prop) => Object.assign(preResult, prop), {})
}
exports.pickProperties = pickProperties; // export for test