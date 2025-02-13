const fs = require('fs');

const deliveriesData = JSON.parse(fs.readFileSync('../Data/deliver.json', 'utf-8'));
const matchesData = JSON.parse(fs.readFileSync('../Data/matches.json', 'utf-8'));

function calculateBowlingEconomy(deliveries, matchIds) {
    let bowlerStats = {};
    for(let delivery of deliveries){
        if (matchIds.includes(delivery.match_id)) {
            const bowler = delivery.bowler;

            if (!bowlerStats[bowler]) {
                bowlerStats[bowler] = {
                    totalBalls: delivery.wide_runs > 0 || delivery.noball_runs > 0 ? 0 : 1,
                    totalRuns: parseInt(delivery.wide_runs) + parseInt(delivery.noball_runs) + parseInt(delivery.batsman_runs)
                };
            } else {
                bowlerStats[bowler].totalBalls += delivery.wide_runs > 0 || delivery.noball_runs > 0 ? 0 : 1;
                bowlerStats[bowler].totalRuns += parseInt(delivery.wide_runs) + parseInt(delivery.noball_runs) + parseInt(delivery.batsman_runs);
            }
        }
    }

    let bowlerEconomy = [];

    for (let bowler in bowlerStats) {
        let economyRate = ((bowlerStats[bowler].totalRuns * 6) / bowlerStats[bowler].totalBalls).toFixed(2);
        bowlerEconomy.push({ [bowler]: economyRate });
    }

    bowlerEconomy.sort((a, b) => {
        let economyA = Object.values(a)[0];
        let economyB = Object.values(b)[0];

        return economyA - economyB;
    });

    return bowlerEconomy.slice(0, 10);
}

function getMatchIdsForSeason(matches, seasonYear) {
    let season_ids = [];
    for(let index of matches){
        if(index.season == seasonYear){
            season_ids.push(index.id);
        }
    }
    return season_ids;
}

function getTopTenBowlers() {

    const seasonMatchIds = getMatchIdsForSeason(matchesData, '2015');

    return calculateBowlingEconomy(deliveriesData, seasonMatchIds);
}

module.exports = getTopTenBowlers;

let topBowlers = getTopTenBowlers();
console.log(topBowlers);
fs.writeFileSync('../Public/4.json', JSON.stringify(topBowlers, null, 2));
