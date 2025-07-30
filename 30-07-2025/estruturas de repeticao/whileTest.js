function attempt(target){
    let sum = 0;
    let count = 0;
    while(sum <= target){
        sum+=Math.random();;
        count++;
    }
    return count 
}

function test(){
    let results = []
    const tries = 10;
    const target = 10;

    for(i = 1; i <= tries; i++){
        results.push(attempt());
    }

    console.log(results);
}

test()