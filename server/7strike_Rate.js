const fs = require('fs');

function strikeRatePerSeason() {
    let matches = JSON.parse(fs.readFileSync('../Data/matches.json', 'utf-8'));
    let deliveries = JSON.parse(fs.readFileSync('../Data/deliver.json', 'utf-8'));

    let seasonData = matches.reduce((acc, match) => {
        if (!acc[match.season]) {
            acc[match.season] = new Set();
        }
        acc[match.season].add(match.id);
        return acc;
    }, {});

    let playerDetails = {};

    for (let season in seasonData) {
        let playerRuns = {};

        for(let delivery of deliveries){
            if (seasonData[season].has(delivery.match_id)) {
                let batsman = delivery.batsman;
                let runs = parseInt(delivery.batsman_runs);
                let isValidBall = !(parseInt(delivery.noball_runs) > 0 || parseInt(delivery.wide_runs) > 0);

                if (!playerRuns[batsman]) {
                    playerRuns[batsman] = { runs: 0, balls: 0 };
                }

                playerRuns[batsman].runs += runs;
                if (isValidBall) {
                    playerRuns[batsman].balls += 1;
                }
            }
        }

        let strikeRate = {};
        for (let batsman in playerRuns) {
            let { runs, balls } = playerRuns[batsman];
            strikeRate[batsman] = balls > 0 ? ((runs / balls) * 100).toFixed(2) : "0.00";
        }

        playerDetails[season] = strikeRate;
    }

    return playerDetails;
}

let result = strikeRatePerSeason();
console.log(result);
fs.writeFileSync('../Public/7.json', JSON.stringify(result, null, 2));
