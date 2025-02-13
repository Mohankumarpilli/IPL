const fs = require('fs');

const data = JSON.parse(fs.readFileSync('../Data/deliver.json', 'utf-8'));

const data1 = JSON.parse(fs.readFileSync('../Data/matches.json','utf-8'));

function extra_runs_per_team(){
    function collect_season(data){
        let res = data.filter((ele) => ele.season === '2016')
                        .map(ele => ele.id);
        return res
    }
    
    const season_ids = collect_season(data1);
    
    
    function extra_runs_per_team(data,season) {
        
        return data.reduce((acc,ele) => {
            if (season.includes(ele.match_id)) { 
                const ball_team = ele.bowling_team;
                if(!acc[ball_team]){
                    acc[ball_team] = parseInt(ele.extra_runs);
                }else{
                    acc[ball_team] += parseInt(ele.extra_runs);
                }
            }
            return acc;
        },{});
    }
    
    const arr = extra_runs_per_team(data,season_ids);
    return arr;
}


module.exports = extra_runs_per_team;

let result = extra_runs_per_team();
console.log(result)
fs.writeFileSync('../Public/3.json',JSON.stringify(result,null,2));
  