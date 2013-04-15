/*global define*/
define([
	'underscore',
	'backbone'
], function (_, Backbone) {
	'use strict';

	var TrackModel = Backbone.Model.extend({
		// Default attributes for the todo
		// and ensure that each todo created has `title` and `completed` keys.
		// defaults: {
		// 	title: '',
		// 	completed: false
		// },
		
		start: function(){
			this.stream = soundManager.createSound({
			  id: this.get("track").src,
			  url: 'http://api.soundcloud.com'+this.get("track").src+'/stream?client_id=b2b9bd0bd247e78817bdf696aa8205f0'
			});
			var that = this;
			soundManager.play(this.get("track").src,{
				onfinish: function() {
					that.trigger("nextTrack")
				}
			});
		},

		play: function(){
			this.stream.play();
		},

		stop: function(){
			this.stream.stop();
		}

	});

	return TrackModel;
});
