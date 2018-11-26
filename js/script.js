jQuery(document).ready(function(){
    jQuery.get( "https://api.github.com/repos/abelcallejo/abelcallejo.github.io/commits", function( data ) {
    var lastCommit = new Date(data[0].commit.author.date);
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    
    var asOf = months[lastCommit.getMonth()] + ' ' + lastCommit.getDate() + ', ' + lastCommit.getFullYear();
    
    jQuery('#as-of').html(asOf);
    }, "json" );
});