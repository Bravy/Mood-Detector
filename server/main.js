import { Meteor } from 'meteor/meteor';

import { Mood } from '../collection.js';
Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish('mood',function(){
var currentId= this.userId;
return Mood.find();
});

Meteor.methods({
	'insertMood': function(text , value){
		console.log("hello");
	Mood.insert({
		value,
		text,
		createdAt: new Date(),
		owner: Meteor.userId(),
		username: Meteor.user().username,
    });
	},
});
