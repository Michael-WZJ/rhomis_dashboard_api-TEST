const foodConsumedGoodSeason = [
  "grainsrootstubers_good_season",
  "legumes_good_season",
  "veg_leafy_good_season",
  "vita_veg_fruit_good_season",
  "vegetables_good_season",
  "fruits_good_season",
  "meat_good_season",
  "milk_dairy_good_season",
  "grains_good_season",
  "roots_tubers_good_season",
  "pulses_good_season",
  "nuts_seeds_good_season",
  "milk_good_season",
  "organ_meat_good_season",
  "meat_poultry_good_season",
  "fish_seafood_good_season",
  "eggs_good_season",
  "green_veg_good_season",
  "vita_veg_good_season",
  "vita_fruits_good_season",
  "other_veg_good_season",
  "other_fruits_good_season"
];
exports.foodConsumedGoodSeason = foodConsumedGoodSeason; // export for test
const foodConsumedBadSeason = [
  "grainsrootstubers_bad_season",
  "legumes_bad_season",
  "veg_leafy_bad_season",
  "vita_veg_fruit_bad_season",
  "vegetables_bad_season",
  "fruits_bad_season",
  "meat_bad_season",
  "milk_dairy_bad_season",
  "grains_bad_season",
  "roots_tubers_bad_season",
  "pulses_bad_season",
  "nuts_seeds_bad_season",
  "milk_bad_season",
  "organ_meat_bad_season",
  "meat_poultry_bad_season",
  "fish_seafood_bad_season",
  "eggs_bad_season",
  "green_veg_bad_season",
  "vita_veg_bad_season",
  "vita_fruits_bad_season",
  "other_veg_bad_season",
  "other_fruits_bad_season"
];
exports.foodConsumedBadSeason = foodConsumedBadSeason; // export for test
const foodConsumedLastMonth = [
  "grainsrootstubers_last_month",
  "legumes_last_month",
  "veg_leafy_last_month",
  "vita_veg_fruit_last_month",
  "vegetables_last_month",
  "fruits_last_month",
  "meat_last_month",
  "milk_dairy_last_month",
  "grains_last_month",
  "roots_tubers_last_month",
  "pulses_last_month",
  "nuts_seeds_last_month",
  "milk_last_month",
  "organ_meat_last_month",
  "meat_poultry_last_month",
  "fish_seafood_last_month",
  "eggs_last_month",
  "green_veg_last_month",
  "vita_veg_last_month",
  "vita_fruits_last_month",
  "other_veg_last_month",
  "other_fruits_last_month"
];
exports.foodConsumedLastMonth = foodConsumedLastMonth; // export for test

const keysOfIndicator = [
  "id_unique",
  "id_proj",
  "id_form",

  "hfias_status",
  "fies_score",
  "hdds_good_season",
  "hdds_bad_season",
  "hdds_last_month",
];

let keysOfProcessed = [
  "id_unique",
  "id_country",
  "region",

  "foodshortagetime_months_which"
];

keysOfProcessed = keysOfProcessed.concat(foodConsumedGoodSeason,
  foodConsumedBadSeason,foodConsumedLastMonth);


//
exports.getRawData = (indicatorDataList, processedDataList) => {
  let dataListOfIndicator = indicatorDataList.map(indicatorData => indicatorData.data);
  let rawDataOfIndicator = dataListOfIndicator.map(data => pickProperties(data, keysOfIndicator));
  rawDataOfIndicator.sort(funcSortById);

  let dataListOfProcessed = processedDataList.map(processedData => processedData.data);
  let rawDataOfProcessed = dataListOfProcessed.map(data => pickProperties(data, keysOfProcessed));
  rawDataOfProcessed.sort(funcSortById);

  let rawData = rawDataOfIndicator.map((obj, index) => {
    let newObj = {};
    Object.assign(newObj, obj, rawDataOfProcessed[index]);
    return newObj;
  });

  console.log(rawData.length + " records of combination raw data");
  return rawData;
};


//
const pickProperties = (data, selecKeys) => {
  let properties = selecKeys.map(key => {
    return (key in data ? {[key] : data[key]} : {})
  });

  return properties.reduce((preResult, prop) => Object.assign(preResult, prop), {})
}
exports.pickProperties = pickProperties; // export for test

//
const funcSortById = (a,b) => {
  const idA = a["id_unique"];
  const idB = b["id_unique"];
  if (idA > idB) {
    return 1;
  } else if (idA < idB) {
    return -1;
  } else {
    return 0;
  }
};