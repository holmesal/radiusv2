/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'soundmanager2',
	'models/track',
	'collections/playlist'
], function ($, _, Backbone, soundManager,  TrackModel, PlaylistCollection) {
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
			//create a new collection
			this.collection = new PlaylistCollection();
			this.getTracks();
			//set current to the first track
			this.set("current",this.collection.at(0));
			//set up the streaming
			this.soundInit();
		},

		//initialize soundManager
		soundInit: function(){
			console.log("initializing soundManager...")
			var that = this;
			soundManager.setup({
				url: '../components/soundmanager2/swf',
				// optional: use 100% HTML5 mode where available
				preferFlash: false,
				debugMode: false,
				onready: function() {
					//play the first track
					console.log("play")
					that.get("current").start()
				},
				ontimeout: function() {
					// Hrmm, SM2 could not start. Missing SWF? Flash blocked? Show an error, etc.?
					console.log("shit broke")
				}
			});
		},

		//get the tracks from the server
		getTracks: function(){
			console.log("SPOOF GET TRACKS");
			var inputs = [];
			var newTrack = new TrackModel({
				artist: {
					name: "The Royal Fucks",
					city: "Boston",
					country: "USA",
					links: ["Link 1","Link 2"]
				},
				track: {
					title: "Sbefseg",
					src: "/tracks/72047558"
				}	
			})

			this.collection.push(newTrack)

			var newTrack = new TrackModel({
				artist: {
					name: "T;KADMFKLASDMFASks",
					city: "BoSADFASDFston",
					country: "USSADFSADA",
					links: ["Link 1","Link 2"]
				},
				track: {
					title: "SoASDFASFASg",
					src: "/tracks/30941816"
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
					src: "/tracks/53097530"
				}	
			})

			this.collection.push(newTrack2)


			this.grabImages();
			//select the first track
			// this.current = {
			// };

			// console.log(this.current);
		},

		nextTrack: function(){
			//try to go to the next track
			var idx = this.collection.indexOf(this.get("current"))
			if (this.collection.length > idx+1){ //end
				//stop the current track
				this.get("current").stop();
				//change current track
				this.set("current",this.collection.at(idx+1));
				//play current track, pass the view
				this.get("current").start();
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
				//stop the current track
				this.get("current").stop();
				//change current track
				this.set("current",this.collection.at(idx-1));
				//play current track, pass the view
				this.get("current").start(this);
				return true
			} else{
				console.log("can't go back")
				return false
			}
		},

		grabImages: function(){
			this.collection.forEach(this.grabImage)
		},

		grabImage: function(el,idx,collection){
			if (!el.get("track").artwork_url){
				var url = 'http://api.soundcloud.com'+el.get("track").src+'?client_id=b2b9bd0bd247e78817bdf696aa8205f0'
				$.getJSON(url,function(data){
					if (data.artwork_url){
						var curtrack  = el.get("track");
						curtrack.artwork_url = data.artwork_url;
						el.set("track",curtrack)
					} else {
						var curtrack  = el.get("track");
						curtrack.artwork_url = 'http://profile.ak.fbcdn.net/hprofile-ak-prn1/c66.66.828.828/s160x160/601362_10151472569134490_512841892_n.jpg';
						el.set("track",curtrack)
					}
					console.log(el.get("track").artwork_url)
				});
			};
		}

	});

	return PlayerModel;
});
