const fs = require('fs');

function countWinsPerSeason() {
    const matchesData = JSON.parse(fs.readFileSync('../Data/matches.json', 'utf-8'));
    let seasonWiseWins = {};
    for(let index of matchesData){
        if (!seasonWiseWins[index.season]) {
            seasonWiseWins[index.season] = {};
        }

        if (!seasonWiseWins[index.season][index.winner]) {
            seasonWiseWins[index.season][index.winner] = 1;
        } else {
            seasonWiseWins[index.season][index.winner] += 1;
        }
    }

    return seasonWiseWins;
}

let matchWins = countWinsPerSeason();
console.log(matchWins);
fs.writeFileSync('../Public1/2.json', JSON.stringify(matchWins, null, 2));