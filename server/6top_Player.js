const fs = require('fs');

function getTopPlayersPerSeason() {
    const matchesData = JSON.parse(fs.readFileSync('../Data/matches.json', 'utf-8'));

    let topPlayers = {};
    for(let match of matchesData){
        if (!topPlayers[match.season]) {
            topPlayers[match.season] = { [match.player_of_match]: 1 };
        } else {
            if (!topPlayers[match.season][match.player_of_match]) {
                topPlayers[match.season][match.player_of_match] = 0;
            }
            topPlayers[match.season][match.player_of_match] += 1;
        }
    }

    let topPlayerPerSeason = {};

    for (let season in topPlayers) {
        topPlayerPerSeason[season] = Object.entries(topPlayers[season])
            .sort((a, b) => b[1] - a[1])[0]; 
    }

    return topPlayerPerSeason;
}

module.exports = getTopPlayersPerSeason;

let result = getTopPlayersPerSeason();
console.log(result);
fs.writeFileSync('../Public/6.json', JSON.stringify(result, null, 2));
