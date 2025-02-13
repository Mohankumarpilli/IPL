const fs = require('fs');

const deliveriesData = JSON.parse(fs.readFileSync('../Data/deliver.json', 'utf-8'));
const matchesData = JSON.parse(fs.readFileSync('../Data/matches.json', 'utf-8'));

function getMatchIdsForSeason(matches, seasonYear) {
    let season_ids = [];
    for(let index of matches){
        if(index.season == seasonYear){
            season_ids.push(index.id);
        }
    }
    return season_ids;
}

function computeExtraRuns(deliveries, matchIds) {
    let extraRunsByTeam = {};

    for(let delivery of deliveries){
        if (matchIds.includes(delivery.match_id)) { 
            const bowlingTeam = delivery.bowling_team;
            const extraRuns = parseInt(delivery.extra_runs);

            if (!extraRunsByTeam[bowlingTeam]) {
                extraRunsByTeam[bowlingTeam] = extraRuns;
            } else {
                extraRunsByTeam[bowlingTeam] += extraRuns;
            }
        }
    }
    return extraRunsByTeam;
}

function calculateExtraRunsPerTeam() {

    const seasonMatchIds = getMatchIdsForSeason(matchesData, '2016');
    return computeExtraRuns(deliveriesData, seasonMatchIds);
}

module.exports = calculateExtraRunsPerTeam;

let extraRunsResult = calculateExtraRunsPerTeam();
console.log(extraRunsResult);    
fs.writeFileSync('../Public1/3.json', JSON.stringify(extraRunsResult, null, 2));
