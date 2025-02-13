const fs = require('fs');

function countMatchesPerSeason() {
    const matchesData = JSON.parse(fs.readFileSync('../Data/matches.json', 'utf-8'));

    let seasonMatchCount = {};

    for(let index of matchesData){
        if(!seasonMatchCount[index.season]){
            seasonMatchCount[index.season] = 1;
        }else{
            seasonMatchCount[index.season] += 1;
        }
    }

    return seasonMatchCount;
}

let matchResults = countMatchesPerSeason();
fs.writeFileSync('../Public/1.json', JSON.stringify(matchResults, null, 2));
