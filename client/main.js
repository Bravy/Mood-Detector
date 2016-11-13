import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Accounts } from 'meteor/accounts-base';
import { Mood } from '../collection.js';
Meteor.subscribe('mood');

var Highcharts = require("highcharts/highstock");
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});
import './main.html';

Template.mood.events({
  'click .mood1'(event){
	var value = event.currentTarget.value;
	console.log(value);
	if(value == 0){ text ="sad"; 
		$('.baybu').css({'background-image': 'none','background-color':'#0c5b9b'});
		$('.theme').css({'background-image':" url('/sad.gif')"});
	}
	if(value == 1){text ="fear";
		$('.baybu').css({ 'background-color':'#9e29ad'});
		$('.theme').css({'background-image':" url('/fear.gif')"});
	}
	if(value == 2){ text ="anger";						
		$('.baybu').css({'background-color':'#fd1510'});
		$('.theme').css({'background-image':" url('/anger.gif')"});
	}
	if(value == 3){ text ="disgust";
		$('.baybu').css({'background-color':'#129204'});
		$('.theme').css({'background-image':" url('/disgust.gif')"});
	}
	if(value == 4){ text ="happy";
		$('.baybu').css({'background-color':'#fcf02a'});
		$('.theme').css({'background-image':" url('/joy.gif')"});
	}
	Meteor.call('insertMood', text, value);
  },
});
Template.history.helpers({
	moods() {
	$('.baybu').css({'background-image':" url('/memory .jpg')"});
	var username = Meteor.user().username;
	return Mood.find({ username: username}, {sort:{ createdAt:-1 }});
	},
}); 

Template.graph.helpers({

	charts: function() {
		var username = Meteor.user().username;
		var moodGraphData = [];	
	        var history =  Mood.find({username: username },{sort: {createdAt: 1}}).fetch();
		console.log(history);
		for (i in history) {
			var thismood = {y:parseInt(history[i].value), name:history[i].text}
			moodGraphData.push(thismood);  
		}
		Meteor.defer(function() {
	console.log(moodGraphData);		
        Highcharts.chart('chart', {
          series: [{
            type: 'line',
            data: moodGraphData
          }]
        });
		});
		
	},	

});
