const fs = require('fs');

function countWinsPerSeason() {
    const matchesData = JSON.parse(fs.readFileSync('../Data/matches.json', 'utf-8'));

    let seasonWiseWins = matchesData.reduce((winCount, match) => {
        if (!winCount[match.season]) {
            winCount[match.season] = {};
        }

        if (!winCount[match.season][match.winner]) {
            winCount[match.season][match.winner] = 1;
        } else {
            winCount[match.season][match.winner] += 1;
        }

        return winCount;
    }, {});

    return seasonWiseWins;
}

let matchWins = countWinsPerSeason();
console.log(matchWins);
fs.writeFileSync('../Public/2.json', JSON.stringify(matchWins, null, 2));
