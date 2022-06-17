const assert = require("assert");
const processor = require("../app/controllers/dataProcessor.js");
const dt = require("../data_test/data_test.js");

const selectKeys = [
  "id_hh",
  "id_form",

  "id_proj",
  "iso_country_code",
  "year",

  "hfias_status",
  "fies_score"
];
let goodSeason = processor.foodConsumedGoodSeason;
let badSeason = processor.foodConsumedBadSeason;
let lastMonth = processor.foodConsumedLastMonth;


describe("testProcessor", () => {

  it("test_getRawData", () => {
    let resultList = processor.getRawData(dt.indicatorDataList, dt.processedDataList);
    console.log(resultList);
    assert.equal(resultList.length, 65);
  });

  it("test_pick", () => {
    let dataI1 = dt.indicatorDataList[0].data;
    let dataP1 = dt.processedDataList[0].data;
    let dataP2 = dt.processedDataList[8].data;
    assert.equal(dataP2.id_hh, "44c111f2ac30052d0dadd7d19c55d43c");
    let newArray = goodSeason.concat(badSeason,lastMonth);
    let resultP1 = processor.pickProperties(dataP1, newArray);
    let resultP2 = processor.pickProperties(dataP2, newArray);

    console.log(processor.pickProperties(dataI1, selectKeys));

    assert.equal(resultP1.veg_leafy_good_season, "daily");
    assert.equal(resultP1.meat_good_season, "monthly");
    assert.equal(resultP1.eggs_bad_season, "monthly");
    assert.equal(resultP1.nuts_seeds_bad_season, "monthly");
    assert.equal(resultP2.fruits_last_month, "weekly");
    assert.equal(resultP2.vegetables_last_month, "daily");
  });

  it("combine array", () => {
    assert.equal(goodSeason.length, 22);
    assert.equal(badSeason.length, 22);
    assert.equal(lastMonth.length, 22);

    let newArray = goodSeason.concat(badSeason,lastMonth);
    assert.equal(newArray.length, 66);
    console.log(newArray);
  });

});