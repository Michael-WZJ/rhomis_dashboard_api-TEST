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

describe("testProcessor", () => {
  it("test_getRawDataOfHFIAS", () => {
    console.log(processor.getRawData(dt.indicatorDataList));
  });

  it("test_pick", () => {
    let data = dt.indicatorDataList[0].data;
    console.log(processor.pickProperties(data, selectKeys));
  });

  it("test_isStandardHFIAS", () => {
    assert.equal(fs.isStandardHFIAS("s"), false);
    assert.equal(fs.isStandardHFIAS(""), false);
    assert.equal(fs.isStandardHFIAS(null), false);
    assert.equal(fs.isStandardHFIAS("moderateLY_FI"), true);
  });
});