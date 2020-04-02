var notes = new Array();

var loaded = 0;
var toBeLoaded = 4;

function sortByDateDesc( a, b ){
	if ( a.date > b.date ){
		return -1;
	}
	if ( a.date < b.date ){
		return 1;
	}
  	return 0;
}

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function paint(){
	if(loaded==toBeLoaded){

		notes.sort( sortByDateDesc );
		notes.forEach(function(note) {
			if( !( note.title === null && typeof note.title === "object") ){
				if( note.title.length>0 ){
					var year = note.date.getFullYear();
					var monthIndex = note.date.getMonth();
					var month = months[monthIndex];
					var date = note.date.getDate();

					var domNote = jQuery('#note-blueprint').clone();
					jQuery(domNote).attr('id',note.post_id);
					jQuery(domNote).find('img').attr('src','../images/'+note.icon+'.png');
					jQuery(domNote).find('a').attr('href',note.link);
					jQuery(domNote).find('h4').html(note.title);
					jQuery(domNote).find('.note-type').html( note.type );
					jQuery(domNote).find('.note-date').html( month + ' ' + date + ', ' + year );
					jQuery(domNote).show();
					jQuery('#notes-container').append(domNote);
				}
			}
		});
	}
}

function fillStackOverflowTitles(){
	var questionIds = '';
	var finalQuestionIds = '';
	var questionIdCount = 0;
	for (i = 0; i < notes.length; i++) {
		if( notes[i].complete==false && notes[i].icon=='stackoverflow' ){
			questionIds = questionIds + notes[i].post_id + ';';
			questionIdCount = questionIdCount + 1;
		}
	}
	finalQuestionIds = questionIds.substr(0,questionIds.length-1);

	if(questionIdCount>0){
		jQuery.get( "https://api.stackexchange.com/2.2/questions/"+finalQuestionIds+"?fromdate=1375315200&order=desc&sort=activity&site=stackoverflow", function( data ) {
			data.items.forEach(function(element) {
				for (i = 0; i < notes.length; i++) {
					if(notes[i].post_id==element.question_id){
						notes[i].title = element.title;
						notes[i].complete = true;
					}
				}
			});

			loaded = loaded + 1;
			paint();
		});
	}
}

/** StackOverflow Questions **/
jQuery.get( "https://api.stackexchange.com/2.2/users/1121841/questions?order=desc&sort=votes&site=stackoverflow", function( data ) {

	data.items.forEach(function(element) {
	  	var posted = new Date(0);
	  	posted.setUTCSeconds(element.creation_date);

	  	var item = {
	  		title: element.title,
	  		link: element.link,
	  		date: posted,
	  		type: 'Programming topic',
	  		icon: 'stackoverflow',
	  		complete: true,
	  		post_id: element.question_id
	  	};

	  	notes.push(item);
	});

	loaded = loaded + 1;
	paint();
});


/** AskUbuntu Questions **/
jQuery.get( "https://api.stackexchange.com/2.2/users/191051/questions?order=desc&sort=votes&site=askubuntu", function( data ) {

	data.items.forEach(function(element) {
	  	var posted = new Date(0);
	  	posted.setUTCSeconds(element.creation_date);

	  	var item = {
	  		title: element.title,
	  		link: element.link,
	  		date: posted,
	  		type: 'System management topic',
	  		icon: 'askubuntu',
	  		complete: true,
	  		post_id: element.question_id
	  	};

	  	notes.push(item);
	});

	loaded = loaded + 1;
	paint();
});


/** StackOverflow Answers **/
jQuery.get( "https://api.stackexchange.com/2.2/users/1121841/answers?order=desc&sort=votes&site=stackoverflow", function( data ) {

	data.items.forEach(function(element) {

	  	var posted = new Date(0);
	  	posted.setUTCSeconds(element.creation_date);

	  	var item = {
	  		title: null,
	  		link: "https://stackoverflow.com/a/" + element.answer_id,
	  		date: posted,
	  		type: 'Programming discussion',
	  		icon: 'stackoverflow',
	  		complete: false,
	  		post_id: element.question_id
	  	};

	  	notes.push(item);
	});

	fillStackOverflowTitles();
});


/** GitHub Gists **/
jQuery.get( "https://api.github.com/users/abelcallejo/gists", function( data ) {

	data.forEach(function(element) {

	  	var posted = new Date(element.created_at);

	  	var item = {
	  		title: element.description,
	  		link: element.html_url,
	  		date: posted,
	  		type: 'Programming guide',
	  		icon: 'github',
	  		complete: true,
	  		post_id: element.id
	  	};

	  	notes.push(item);
	});

	loaded = loaded + 1;
	paint();
});