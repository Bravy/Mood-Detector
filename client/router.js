FlowRouter.route('/history',{
	action: function(){
		BlazeLayout.render("history");
	}
});

FlowRouter.route('/', {
	action: function(){
		BlazeLayout.render("home");
	}
});

FlowRouter.route('/graph', {
	action: function(){
		BlazeLayout.render("graph");
	}
});
