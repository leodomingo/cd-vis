
var states = new Set();

var athletes = {
	"W Softball" : [],
	"W Basketball" : [],
	"M Basketball" : [],
	"W Soccer" : [],
	"Swim" : [],
	"M Lacrosse" : [],
	"M Tennis" : [],
	"XC Track" : [],
	"W Field Hockey" : [],
	"W Rowing" : [],
	"W Golf" : [],
	"M Soccer" : [],
	"Football" : [],
	"Wrestling" : [],
	"W Tennis" : [],
};
var domesticPercentages = [];
var virginianPercentages = [];
var schools = {}
var totdomestic = 0;
var totinstate = 0;
var totathletes = 0;

d3.csv("sources/out.csv", function(error,rows) {
		if (error) throw error;
		totathletes = rows.length;
		for (i = 0; i < rows.length; i++){
			if(rows[i].state.includes(".")){
				states.add(rows[i].state);
			}
			var school = rows[i].school.trim();
			schools[school] = (schools[school] || 0) + 1;
		}
	for (i = 0; i < rows.length; i++){
			if (rows[i].sport){
				var curSport = rows[i].sport;
				if (athletes[curSport] != null){
					var curAthlete = athletes[curSport];
					curAthlete.push(rows[i]);
				}
			}
		}
	for (var team in athletes) {
		var domestic = 0;
		var instate = 0;
	    if (athletes.hasOwnProperty(team)) {
	    	for (i =0; i <athletes[team].length;i++)
	    	{
		    	if (athletes[team][i] != null && states.has(athletes[team][i].state)){
		    		domestic++;
		    			if (athletes[team][i].state == "Va."){
		    				instate++;
		    			}
		    	}
	    	}
	    }
	    totdomestic = totdomestic + domestic;
	    totinstate = totinstate + instate;
	    domesticPercentages.push([team,domestic/athletes[team].length*100]);
	    virginianPercentages.push([team, instate/athletes[team].length*100]);
	    console.log("finished " + team + " " + domestic + " virginians.");

	}
	console.log("Domestic: " + totdomestic);
	console.log("Virginian: " + totinstate);
	console.log("Total " + totathletes);
	console.log(domesticPercentages);
	console.log(virginianPercentages);
});