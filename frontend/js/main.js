/*global require*/
'use strict';

// Require.js allows us to configure shortcut alias
require.config({
	// The shim config allows us to configure dependencies for
	// scripts that do not call define() to register a module
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		backboneLocalstorage: {
			deps: ['backbone'],
			exports: 'Store'
		},
		soundmanager2: {
			exports: 'soundManager'
		}

	},
	paths: {
		jquery: '../components/jquery/jquery',
		underscore: '../components/underscore/underscore',
		backbone: '../components/backbone/backbone',
		backboneLocalstorage: '../components/backbone.localStorage/backbone.localStorage',
		text: '../components/requirejs-text/text',
		soundmanager2 : '../components/soundmanager2/soundmanager2-jsmin'
	}
});

require([
	'backbone',
	'routers/router',
	'models/player',
	'views/player',
], function (Backbone, Workspace, PlayerModel, PlayerView) {
	/*jshint nonew:false*/
	// Initialize routing and start Backbone.history()
	var workspace = new Workspace();

	//global radius container
	window.radius = {};

	workspace.on('route:defaultRoute', function(){
		//display landing page
		console.log("landing");
	});

	workspace.on('route:trackRoute', function(trackid){
		//initialize the app
		console.log("Track requested: " + trackid);
	});

	workspace.on('route:stationRoute', function(genre,location){
		console.log("Station requested: "+genre+" in "+location);
		//create a new player model
		var playerModel = new PlayerModel({
			genre: genre,
			location: location
		})

		// window.radius.genre = genre;
		// window.radius.location = location;
		//create a new station view
		var playerView = new PlayerView({model: playerModel});

		console.log(playerView)
	});

	//start the history
	Backbone.history.start();

	// Initialize the application view
	// new AppView();
});
