const fs = require('fs');

function getTossAndMatchWinners() {
    const matchesData = JSON.parse(fs.readFileSync('../Data/matches.json', 'utf-8'));

    const tossAndMatchWinners = matchesData
        .filter(match => match.toss_winner === match.winner)
        .reduce((acc, match) => {
            acc[match.winner] = (acc[match.winner] || 0) + 1;
            return acc;
        }, {});

    return tossAndMatchWinners;
}

module.exports = getTossAndMatchWinners;

let result = getTossAndMatchWinners();
console.log(result);
fs.writeFileSync('../Public/5.json', JSON.stringify(result, null, 2));
