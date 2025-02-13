const fs = require('fs');

function countMatchesPerSeason() {
    const matchesData = JSON.parse(fs.readFileSync('../Data/matches.json', 'utf-8'));

    let seasonMatchCount = matchesData.reduce((matchCount, match) => {
        if (!matchCount[match.season]) {
            matchCount[match.season] = 1;
        } else {
            matchCount[match.season] += 1;
        }
        return matchCount;
    }, {});

    return seasonMatchCount;
}

let matchResults = countMatchesPerSeason();
fs.writeFileSync('../Public/1.json', JSON.stringify(matchResults, null, 2));
