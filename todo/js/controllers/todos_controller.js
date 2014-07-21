Todos.TodosController = Ember.ArrayController.extend({
	actions: {
		createTodo: function() {

			var title = this.get("newTitle");

			if (!title) {
				return false;
			}

			if (!title.trim()) {
				return;
			}

			var todo = this.store.createRecord("todo", {
				title: title,
				isCompleted: false
			});

			todo.set("newTitle", "");

			todo.save();

			this.set("newTitle", "");

		},
		acceptChanges: function() {
			this.set("isEditing", false);
			if (Ember.isEmpty(this.get("model.title"))) {
				this.send("removeTodo");
			} else {
				this.get("model").save();
			}
		},
		removeTodo: function() {
			var todo = this.get("model");
			todo.deleteRecord();
			todo.save();
		}
	},
	remaining: function() {
		return this.filterBy("isCompleted", false).get("length");
	}.property("@each.isCompleted"),
	inflection: function() {
		var remaining = this.get("remaining");
		return remaining === 1 ? "todo" : "todos";
	}.property("remaining")
});