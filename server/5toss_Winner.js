const fs = require('fs');

function getTossAndMatchWinners() {
    const matchesData = JSON.parse(fs.readFileSync('../Data/matches.json', 'utf-8'));
    const tossAndMatchWinners = {};
    for(let match of matchesData){
        if(match.toss_winner === match.winner){
            tossAndMatchWinners[match.winner] = (tossAndMatchWinners[match.winner] || 0) + 1;
        }
    }
    return tossAndMatchWinners;
}

module.exports = getTossAndMatchWinners;

let result = getTossAndMatchWinners();
console.log(result);
fs.writeFileSync('../Public/5.json', JSON.stringify(result, null, 2));