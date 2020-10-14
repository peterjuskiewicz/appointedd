const {
  getData,
  parseData,
  earliestIntervalStart,
  latestIntervalEnd,
  overlapingIntervals,
} = require("./helpers");

describe("Appointedd tests", () => {
  let data;

  // get the mock data for testing
  beforeAll(async () => {
    data = await getData("./data.txt");
    data = parseData(data);
    console.log(data);
  });

  test("earliestIntervalStart should return correct value", () => {
    expect(earliestIntervalStart(data).toISOString()).toBe(
      "2020-01-01T00:15:00.000Z"
    );
  });

  test("latestIntervalEnd should return correct value", () => {
    expect(latestIntervalEnd(data).toISOString()).toBe(
      "2020-01-01T04:45:00.000Z"
    );
  });

  test("overlapingIntervals should return correct value", () => {
    expect(overlapingIntervals(data).length).toBe(3);

    expect(overlapingIntervals(data)).toContain(
      "2020-01-01T00:15:00.000Z/2020-01-01T01:30:00.000Z"
    );
    expect(overlapingIntervals(data)).toContain(
      "2020-01-01T02:00:00.000Z/2020-01-01T03:30:00.000Z"
    );
    expect(overlapingIntervals(data)).toContain(
      "2020-01-01T04:00:00.000Z/2020-01-01T04:30:00.000Z"
    );
  });
});
