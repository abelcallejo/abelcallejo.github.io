jQuery(document).ready(function(){
    function getLastWeekStart(baseline){
        var dayIndex = baseline.getDay();
        var start = baseline - ((dayIndex + 7) * (1000*60*60*24));
        return new Date(start);
    }
    
    jQuery.get( "https://api.github.com/repos/abelcallejo/abelcallejo.github.io/commits", function( data ) {
    var lastCommit = new Date(data[0].commit.author.date);

    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
    
    var timeStamp = new Date();
    var yesterday = new Date();
    yesterday.setDate(timeStamp.getDate() - 1);
    
    var lastWeek = getLastWeekStart(timeStamp);

    var difference = Math.floor((timeStamp - lastCommit) / (1000*60*60*24));
    
    var asOf = "";

    if( lastCommit.getFullYear()==timeStamp.getFullYear() && lastCommit.getMonth()==timeStamp.getMonth() && lastCommit.getDate()==timeStamp.getDate() )
        {
        asOf = "just today";
        }
    else if( lastCommit.getFullYear()==yesterday.getFullYear() && lastCommit.getMonth()==yesterday.getMonth() && lastCommit.getDate()==yesterday.getDate() )
        {
        asOf = "just yesterday";
        }
    else if( lastCommit.getFullYear()==timeStamp.getFullYear() && lastCommit.getMonth()==timeStamp.getMonth() && lastCommit.getDate()<=timeStamp.getDate() )
        {
        asOf = "this month";
        }
    else if( difference>=21 )
        {
        asOf = "3 weeks ago";
        }
    else if( difference>=14 )
        {
        asOf = "2 weeks ago";
        }
    else if( lastWeek<=lastCommit )
        {
        asOf = "last week";
        }
    else if( difference>=2 )
        {
        asOf = "this passed " + days[lastCommit.getDay()];
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