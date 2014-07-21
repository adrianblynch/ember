App = Ember.Application.create();

App.Router.map(function() {
	this.resource("about");
	this.resource("posts", function() {
		this.resource("post", {path: ":post_id"});
	});
});

App.PostsRoute = Ember.Route.extend({
	model: function() {
		return posts;
		/*return $.getJSON("http://tomdale.net/api/get_recent_posts/?callback=?").then(function(data) {
			return data.posts.map(function(post) {
				post.body = post.content;
				return post;
			});
		});*/
	}
});

App.PostRoute = Ember.Route.extend({
	model: function(params) {
		return posts.findBy("id", params.post_id);
		/*return $.getJSON("http://tomdale.net/api/get_post/?id=" + params.post_id + "&callback=?").then(function(data) {
			data.post.body = data.post.content;
			return data.post;
		});*/
	}
});

App.PostController = Ember.ObjectController.extend({
	isEditing: false,
	actions: {
		edit: function() {
			this.set("isEditing", true);
		},
		doneEditing: function() {
			this.set("isEditing", false);
		}
	}
});

Ember.Handlebars.helper("format-date", function(date) {
	return moment(date).fromNow();
});

Ember.Handlebars.helper("format-markdown", function(input) {
	var showdown = new Showdown.converter();
	return new Handlebars.SafeString(showdown.makeHtml(input));
});

var posts = [
	{
		id: "1",
		title: "Title 1",
		author: "Adrian Lynch",
		date: new Date("12-27-2013"),
		excerpt: "This is the excerpt from Title 1",
		body: "Marked Down Header\n------------------\nThis is the body of the post titled Title 1"
	},
	{
		id: "2",
		title: "Title 2",
		author: "Adrian Lynch",
		date: new Date("12-28-2013"),
		excerpt: "This is the excerpt from Title 2",
		body: "This is the body of the post titled Title 2"
	}
];