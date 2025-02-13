const fs = require('fs');

function bestSuperOverEconomy() {
    const deliveries = JSON.parse(fs.readFileSync('../Data/deliver.json', 'utf-8'));

    let bowlerStats = deliveries.reduce((stats, delivery) => {
        if (delivery.is_super_over == 1) {
            const { bowler, wide_runs, noball_runs, batsman_runs } = delivery;
    
            if (!stats[bowler]) {
                stats[bowler] = { balls: 0, runs: 0 };
            }
    
            stats[bowler].balls += (wide_runs > 0 || noball_runs > 0) ? 0 : 1;
            stats[bowler].runs += parseInt(wide_runs) + parseInt(noball_runs) + parseInt(batsman_runs);
        }
        return stats;
    }, {});
    console.log(bowlerStats);

    let economyRates = [];

    for (let [bowler, stats] of Object.entries(bowlerStats)) {
        if (stats.balls > 0) {
            let economy = ((stats.runs * 6) / stats.balls).toFixed(2);
            economyRates.push({ bowler, economy });
        }
    }

    economyRates.sort((a, b) => a.economy - b.economy);

    return economyRates.length ? economyRates[0] : null;
}

let result = bestSuperOverEconomy();
console.log(result);
fs.writeFileSync('../Public/9.json', JSON.stringify(result, null, 2));
//done all 9