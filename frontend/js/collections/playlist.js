/*global define*/
define([
	'underscore',
	'backbone',
	'models/track'
], function (_, Backbone, Track) {
	'use strict';

	var PlaylistCollection = Backbone.Collection.extend({
		// Reference to this collection's model.
		model: Track,

		getCurrentIndex: function(){
			alert("get current index")
		}
	});

	return PlaylistCollection
});
