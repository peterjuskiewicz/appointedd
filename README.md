# Appointedd programming chalennge

## Run the solution

Run the program with the filename: 
`npm start data.txt`

Run tests:
`npm test`

## The solution

### Reading, cleaning and manipulation of data

I was given a data in the following format:

`1@[2019-12-31T23:45:00.000-03:00/2020-01-01T10:30:00.000+06:00,202 0-01-01T07:15:00.000+07:00/2019-12-31T16:00:00.000-10:00]`

The first step, after reading the data from .txt file was to use `String.split()` and build a meaningful data structure. I've decided to use an array of objects:

`[
  { id: '1', times: [[ '2019-12-31T23:45:00.000-03:00', '2020-01-01T10:30:00.000+06:00' ]] }  
]`

In the code there are several `Array.map()` manipulating and cleaning data.

 I was considering to use `JSON.parse()` to parse the array of ISO 8601​ date ranges, however it wasn't possible as the data was missing quotes that would separate items in the array.

 ### Question 1 and question 2

 The solution for the  two questions was to create a sorted array of numbers representing ms since Epoche for start (Question 1) and end (Question 2) interval times. As items it both arrays are sorted it is easy to access the earlies and the latest times.

 ### Question 3

 The solution required to use `moment-range` plugin for time range manipulation. I created an additional data structure to manipulate the data, an array of times objects with worker id and only one interval properties. 

  `[{
    id: '2',
    interval: [
      '2020-01-01T11:00:00.000+09:00',
      '2020-01-01T00:30:00.000-03:00'
    ]
  }]`

There are following steps in this algorithm

1. Compare all the items in the array and return all intersecting ranges.
2. Use `ramda` to get unique ranges
3. Get full intervals
4. Format the return value to represent range string as ISO 8601

It was the most complex question and I'm sure there's space for refactioring and improving this solution. 

### Tests

There is a `helpers.test.js` where I use `jest` to test the 3 funtions. It still can be extended to cover more cases. 

### Next steps
I consider this solution to be in an initial state. There are things to improve such as folder structure, used tools and data structures, higher test coverage etc.

It potentially could be uploaded to the global npm repository. Individual methods could be also deployed as Lambda functions on AWS.

There is an opportunity to create front end part of the application and display the data in a nicer visual manner.
 

 





