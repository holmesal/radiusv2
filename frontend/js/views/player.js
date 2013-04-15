/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/player.html',
	'views/bandInfo',
	'views/coverflow'
], function ($, _, Backbone, PlayerTemplate, BandInfoView, CoverFlowView) {
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

			//listen for nextTrack events
			this.listenTo(this.model.get("current"), 'nextTrack', this.nextTrack);
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
			//create the coverflow view
			this.coverFlowView = new CoverFlowView({model:this.model});
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