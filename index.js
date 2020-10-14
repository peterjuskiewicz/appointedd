const {getData, parseData, earliestIntervalStart, latestIntervalEnd, overlapingIntervals} = require('./helpers');





;(async () => {


    let file = process.argv.slice(2)[0]

    if(!file) {
        console.log('Use: npm start filename')
        return
    }

    let data = await getData(file);
    data = parseData(data)
    console.log('problem 1', earliestIntervalStart(data))
    console.log('problem 2', latestIntervalEnd(data))
    console.log('problem 3', overlapingIntervals(data))
    
}

)()


