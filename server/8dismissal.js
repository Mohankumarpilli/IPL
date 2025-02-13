const fs = require('fs');

function highestDismissalsByBowler() {
    const deliveries = JSON.parse(fs.readFileSync('../Data/deliver.json', 'utf-8'));

    let dismissals = {};

    deliveries.forEach( (delivery) => {
        const { bowler, player_dismissed, dismissal_kind } = delivery;

        if (dismissal_kind && dismissal_kind !== 'run out' && player_dismissed) {
            let pair = `${bowler}-${player_dismissed}`;
            dismissals[pair] = (dismissals[pair] || 0) + 1;
        }
    });

    let topDismissal = Object.entries(dismissals)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 1);

    return Object.fromEntries(topDismissal);
}

let result = highestDismissalsByBowler();
console.log(result);
fs.writeFileSync('../Public/8.json', JSON.stringify(result, null, 2));
