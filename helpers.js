const fs = require("fs");
const os = require("os");
const R = require("ramda");
const Moment = require("moment");
const MomentRange = require("moment-range");

const moment = MomentRange.extendMoment(Moment);

const getData = (filename) =>
  new Promise((resolve) => {
    fs.readFile(filename, "utf8", function (err, data) {
      if (err) {
        throw err;
      }
      resolve(data);
    });
  });

const parseData = (data) => {
  const workers = [];

  // parsing the string to a specific format
  const parsedData = data
    .split(os.EOL)
    .map((worker) => worker.split("@"))
    .map((worker) => [
      worker[0],
      worker[1].replace(" ", "").replace("[", "").replace("]", "").split(","),
    ])
    .map((worker) => [
      worker[0],
      worker[1].map((times) => times.replace(" ", "").trim().split("/")),
    ]);

  // insert parsed data to the array
  parsedData.map(
    (worker, index) => (workers[index] = { id: worker[0], times: worker[1] })
  );

  return workers;
};

// problem 1

const earliestIntervalStart = (data) => {
  // create times array of all intervals
  // items in the array are numbers representing ms since Epoche
  // items are sorted
  let times = [];
  data.map((item) =>
    item.times.map((interval) => (times = [...times, interval[0]]))
  );
  times = times.map((time) => Date.parse(time));
  times.sort();

  // get the first item from the array and return a new Date
  return new Date(times[0]);
};

// problem 2

const latestIntervalEnd = (data) => {
  // create times array of all intervals
  // items in the array are numbers representing ms since Epoche
  // items are sorted
  let times = [];
  data.map((item) =>
    item.times.map((interval) => (times = [...times, interval[1]]))
  );
  times = times.map((time) => Date.parse(time));
  times.sort();

  // get the last item from the array and return a new Date
  return new Date(times[times.length - 1]);
};

// problem 3

const overlapingIntervals = (data) => {
  // create times array of all workers intervals
  // items in the array are objects with id and iterval properties

  let times = [];

  // mapping the data and manipulating times to UTC

  data.map((item) =>
    item.times.map(
      (interval) =>
        (times = [
          ...times,
          {
            id: item.id,
            interval: [
              new Date(Date.parse(interval[0])),
              new Date(Date.parse(interval[1])),
            ],
          },
        ])
    )
  );

  return getOverlapingRanges(times);
};

// helper function to use with R.uniqueWith
const compareRanges = (range1, range2) => {
  return range1.isSame(range2);
};

// compares all intems in the times array
// returns unique interescting ranges
const getOverlapingRanges = (times) => {
  let result = [];

  // get all intersections
  for (let i = 0; i < times.length; i++) {
    for (let j = i + 1; j < times.length; j++) {
      if (times[i].id === times[j].id) {
        continue;
      } else {
        let range1 = moment.range(times[i].interval[0], times[i].interval[1]);
        let range2 = moment.range(times[j].interval[0], times[j].interval[1]);

        if (range1.overlaps(range2)) {
          result.push(range1.intersect(range2));
        }
      }
    }
  }

  // get unique intervals
  result = R.uniqWith(compareRanges, result);
  let unique = [];

  // get the full intervals
  for (let i = 0; i < result.length; i++) {
    for (let j = i + 1; j < result.length; j++) {
      if (result[i].overlaps(result[j])) {
        unique.push(result[i].add(result[j]));
      }
    }
  }
  // format items to represent ranges in ISO 8601 standard
  // could use range.toString() but it returns values without 'Z'
  return unique.map((item) => {
    item = item.toDate();
    return `${item[0].toISOString()}/${item[1].toISOString()}`;
  });
};

module.exports = {
  getData,
  parseData,
  overlapingIntervals,
  earliestIntervalStart,
  latestIntervalEnd,
};
