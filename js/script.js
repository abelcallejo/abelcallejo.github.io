    function getLastWeekStart(baseline){
        var dayIndex = baseline.getDay();
        var start = baseline - ((dayIndex + 7) * (1000*60*60*24));
        return new Date(start);
    }

    function getLastLastWeekStart(baseline){
        var dayIndex = baseline.getDay();
        var start = baseline - ((dayIndex + 14) * (1000*60*60*24));
        return new Date(start);
    }

    function getLastLastLastWeekStart(baseline){
        var dayIndex = baseline.getDay();
        var start = baseline - ((dayIndex + 21) * (1000*60*60*24));
        return new Date(start);
    }

    function getLastMonthStart(baseline){
        var thisMonthIndex = baseline.getMonth();
        var thisYear = baseline.getFullYear();
        
        var lastMonthStart;
        if(0<thisMonthIndex){
            lastMonthStart = new Date(thisYear+'-'+thisMonthIndex+'-01');
            return lastMonthStart;
        } else {
            lastMonthStart = new Date((thisYear-1)+'-'+thisMonthIndex+'-01');
            return lastMonthStart;
        }
        return lastMonthStart;
    }


jQuery(document).ready(function(){
    
    jQuery.get( "https://api.github.com/repos/abelcallejo/abelcallejo.github.io/commits", function( data ) {
    var lastCommit = new Date(data[0].commit.author.date);

    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
    
    var timeStamp = new Date();
    var yesterday = new Date();
    yesterday.setDate(timeStamp.getDate() - 1);
    
    console.log(lastCommit);

    var difference = Math.floor((timeStamp - lastCommit) / (1000*60*60*24));
    if(1<=difference){
        lastCommit.setHours(0,0,0,0)
        console.log(lastCommit);
    }

    console.log(timeStamp);
    console.log(yesterday);
    console.log(difference);

        
    var lastWeek = getLastWeekStart(timeStamp);
    var lastLastWeek = getLastLastWeekStart(timeStamp);
    var lastLastLastWeek = getLastLastLastWeekStart(timeStamp);
    var lastMonth = getLastMonthStart(timeStamp);
    
    var asOf = "";

    if( lastCommit.getFullYear()==timeStamp.getFullYear() && lastCommit.getMonth()==timeStamp.getMonth() && lastCommit.getDate()==timeStamp.getDate() )
        {
        asOf = "just today";
        }
    else if( lastCommit.getFullYear()==yesterday.getFullYear() && lastCommit.getMonth()==yesterday.getMonth() && lastCommit.getDate()==yesterday.getDate() )
        {
        asOf = "just yesterday";
        }
    else if( 2<=difference && difference<=6 )
        {
        asOf = "this passed " + days[lastCommit.getDay()];
        }
    else if( lastWeek<=lastCommit && 7<=difference && difference<=13 )
        {
        asOf = "last week";
        }
    else if( lastLastWeek<=lastCommit && 8<=difference && difference<=20 )
        {
        asOf = "2 weeks ago";
        }
    else if( lastLastLastWeek<=lastCommit && 15<=difference && difference<=27 )
        {
        asOf = "3 weeks ago";
        }
    else if( lastCommit.getFullYear()==timeStamp.getFullYear() && lastCommit.getMonth()==timeStamp.getMonth() && lastCommit.getDate()<=timeStamp.getDate() )
        {
        asOf = "this month";
        }
    else if( lastMonth<=lastCommit )
        {
        asOf = "last month";
        }
    else{
        asOf = months[lastCommit.getMonth()] + ' ' + lastCommit.getDate() + ', ' + lastCommit.getFullYear();
        }
    
    var hour = 0;
    var m = "";
    
    if(lastCommit.getHours()==0)
        {
        hour = 12;
        m = "am";
        }
    else if(lastCommit.getHours()<12)
        {
        hour = lastCommit.getHours();
        m = "am";
        }
    else if(lastCommit.getHours()==12)
        {
        hour = 12;
        m = "pm";
        }
    else{
        hour = lastCommit.getHours()-12;
        m = "pm";
        }
    
    
    jQuery('#as-of').html(asOf);
    jQuery('#last-updated').attr("title", months[lastCommit.getMonth()] + ' ' + lastCommit.getDate() + ', ' + lastCommit.getFullYear() + ' ' + hour + ':' + lastCommit.getMinutes() + ' ' + m);
    
    }, "json" );
});