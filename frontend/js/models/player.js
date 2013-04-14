/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'soundcloud',
	'soundmanager2',
	'models/track',
	'collections/playlist'
], function ($, _, Backbone, SC, soundManager,  TrackModel, PlaylistCollection) {
	'use strict';

	var PlayerModel = Backbone.Model.extend({
		// Default attributes for the todo
		// and ensure that each todo created has `title` and `completed` keys.
		// defaults: {
		// 	title: '',
		// 	completed: false
		// },
		
		defaults: {
			current: {}
		},

		initialize: function(){
			//handshake with soundcloud
			this.scInit();
			//create a new collection
			this.collection = new PlaylistCollection();
			this.getTracks();
			//set current to the first track
			this.set("current",this.collection.at(0));
		},

		//handshake with SC
		scInit: function(){
			console.log("init")
			// var init = SC.initialize({
			// 	client_id: "b2b9bd0bd247e78817bdf696aa8205f0"
			// });

			// console.log(SC.get("/tracks/53097530"))
			// SC.stream("/tracks/53097530",function(sound){
			// 	console.log("stream ready")
			// 	console.log(sound)
			// 	// sound.play()
			// })
			// SC.whenStreamingReady(function(){
			// 	SC.stream("/tracks/53097530", {
			// 	  autoPlay: true
			// 	});
			// })

			// console.log(streamo)
		},

		//get the tracks from the server
		getTracks: function(){
			console.log("SPOOF GET TRACKS");
			var newTrack = new TrackModel({
				artist: {
					name: "The Royal Fucks",
					city: "Boston",
					country: "USA",
					links: ["Link 1","Link 2"]
				},
				track: {
					title: "Some goddamn song",
					src: "Some link"
				}	
			})

			this.collection.push(newTrack)

			var newTrack2 = new TrackModel({
				artist: {
					name: "Thasdfsads",
					city: "Bosasdfaston",
					country: "UsadfasdSA",
					links: ["Lisadfasnk 1","Linasdfask 2"]
				},
				track: {
					title: "Ssdfsaome goddamn song",
					src: "Somasdfsde link"
				}	
			})

			this.collection.push(newTrack2)


			console.log("new collection")
			console.log(this)
			//select the first track
			// this.current = {
			// };

			// console.log(this.current);
		},

		nextTrack: function(){
			//try to go to the next track
			var idx = this.collection.indexOf(this.get("current"))
			if (this.collection.length > idx+1){ //end
				this.set("current",this.collection.at(idx+1))
				return true
			} else{
				console.log("can't go forward")
				return false
			}
		},

		prevTrack: function(){
			//try to go to the next track
			var idx = this.collection.indexOf(this.get("current"))
			if (idx-1 >= 0){ //start
				this.set("current",this.collection.at(idx-1))
				return true
			} else{
				console.log("can't go back")
				return false
			}
		}

	});

	return PlayerModel;
});
