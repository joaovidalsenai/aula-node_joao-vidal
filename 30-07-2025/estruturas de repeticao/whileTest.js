async function attempt(target){
    let sum = 0;
    let count = 0;
    while(sum <= target){
        sum += Math.random();
        count++;
    }
    return count;
}

async function crescent(arr){
    return [...arr].sort((a, b) => a - b);
}

async function median(arr) {
    if (arr.length === 0) {
        return undefined; // Or handle as an error, depending on requirements
    }
    const mid = Math.floor(arr.length / 2);
    if (arr.length % 2 === 1) {
        // Odd length
        return arr[mid];
    } else {
        // Even length
        return (arr[mid - 1] + arr[mid]) / 2;
    }
}

async function mean(arr) {
    if (arr.length === 0) {
        return 0; // Handle empty array case to prevent division by zero
    }
    const sum = arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return sum / arr.length;
}

async function mode(arr) {
    if (arr.length === 0) {
        return [];
    }
    const frequencyMap = {};
    let maxCount = 0;
    let modes = [];
    
    arr.forEach(element => {
        frequencyMap[element] = (frequencyMap[element] || 0) + 1;
        if (frequencyMap[element] > maxCount) {
            maxCount = frequencyMap[element];
        }
    });
    
    for (const key in frequencyMap) {
        if (frequencyMap[key] === maxCount) {
            modes.push(Number(key));
        }
    }
    return modes;
}

async function variance(arr) {
    if (arr.length === 0) return 0;
    const meanValue = arr.reduce((sum, val) => sum + val, 0) / arr.length;
    const sumOfSquaredDifferences = arr.reduce((sum, val) => sum + (val - meanValue) ** 2, 0);
    return sumOfSquaredDifferences / (arr.length);
}

async function standardDeviation(variance) {
    return Math.sqrt(variance);
}

async function test(){
    let results = [];
    const tries = 2147483647;
    const target = 10;
    
    for(let i = 1; i <= tries; i++){
        results.push(await attempt(target));
    }
    
    const sorted = await crescent(results);
    const lowest = sorted[0];
    const highest = sorted[sorted.length - 1];
    const range = highest - lowest;
    const varianceValue = await variance(sorted);
    const meanValue = await mean(sorted);
    const medianValue = await median(sorted);
    const modeValue = await mode(sorted);
    const stdDev = await standardDeviation(varianceValue);
    
    const evaluation = {
        "lowest": lowest,
        "highest": highest,
        "range": range,
        "mean": meanValue,
        "median": medianValue,
        "mode": modeValue,
        "variance": varianceValue,
        "standard_deviation": stdDev
    };
   
    console.log(`\nFinal results:`);
    console.log(evaluation);
}

test();