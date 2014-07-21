Todos.TodoController = Ember.ObjectController.extend({
	actions: {
		editTodo: function() {
			this.set("isEditing", true);
		},
		removeTodo: function() {
			var todo = this.get('model');
			todo.deleteRecord();
			todo.save();
		}
	},
	isEditing: false,
	isCompleted: function(key, value) {

		var model = this.get("model");

		if (value === undefined) {
			return model.get("isCompleted");
		} else {
			model.set("isCompleted", value);
			model.save();
			return value;
		}

	}.property("model.isCompleted")
});