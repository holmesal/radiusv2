/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/player.html',
	'views/bandInfo'
], function ($, _, Backbone, PlayerTemplate, BandInfoView) {
	'use strict';

	var PlayerView = Backbone.View.extend({

		el: '#main',

		template: _.template(PlayerTemplate),

		events: {
			'click #next' : 'nextTrack',
			'click #prev' : 'prevTrack'
		},

		initialize: function(){
			//listen for change events
			// this.model.current.on("change",function(){
			// 	alert("ahhh")
			// })
			//get tracks from the server
			// this.model.getTracks();
			//render the app view
			this.render();
		},

		render: function(){
			this.$el.html(this.template({
				genre: this.model.get("genre"),
				location: this.model.get("location")
			}));
			//create a bandInfo view with the new current track
			this.bandInfoView = new BandInfoView({model:this.model});
			//populate the band info view
			this.updateInfo();
		},

		updateInfo: function(){
			// $("#genre").text(this.model.get("genre"));
			// $("#genre").text(genre)
			//update model
			// this.bandInfoView.model = this.model.get("current");
			this.bandInfoView.render();
		},

		nextTrack: function(){
			//switch this.model.current to the next track
			if (this.model.nextTrack()){
				this.updateInfo();
			} else{
				//load more tracks
			};
		},

		prevTrack: function(){
			//switch this.model.current to the next track
			if (this.model.prevTrack()){
				//update
				this.updateInfo();
			}

		}

	});

	return PlayerView;

});