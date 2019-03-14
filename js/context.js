function When(){
    this.getContext = function(baselineDate,recentDate){
        var seconds = Math.floor((recentDate - baselineDate) / (1000*60));
        var seconds = Math.floor((recentDate - baselineDate) / (1000*60));

    }
}

var when = new When();


var baseline = new Date();
var recent = new Date();

console.log(baseline.valueOf())