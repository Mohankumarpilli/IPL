const fs = require('fs');

function bestSuperOverEconomy() {
    const deliveries = JSON.parse(fs.readFileSync('../Data/deliver.json', 'utf-8'));

    let bowlerStats = {};
    for(let delivery of deliveries){
        if (delivery.is_super_over == 1) {
            const { bowler, wide_runs, noball_runs, batsman_runs } = delivery;
    
            if (!bowlerStats[bowler]) {
                bowlerStats[bowler] = { balls: 0, runs: 0 };
            }
    
            bowlerStats[bowler].balls += (wide_runs > 0 || noball_runs > 0) ? 0 : 1;
            bowlerStats[bowler].runs += parseInt(wide_runs) + parseInt(noball_runs) + parseInt(batsman_runs);
        }
    }

    let economyRates = [];

    for (let [bowler, stats] of Object.entries(bowlerStats)) {
        if (stats.balls > 0) {
            let economy = ((stats.runs * 6) / stats.balls).toFixed(2);
            economyRates.push([ bowler, economy ]);
        }
    }

    economyRates.sort((a, b) => a[1] - b[1]);

    return economyRates[0];
}

let result = bestSuperOverEconomy();
console.log(result);
fs.writeFileSync('../Public/9.json', JSON.stringify(result, null, 2));
