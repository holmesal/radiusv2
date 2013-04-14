/*global define*/
define([
	'jquery',
	'backbone',
	'collections/todos',
	'common'
], function ($, Backbone, Todos, Common) {
	'use strict';

	var Workspace = Backbone.Router.extend({
		routes: {
			's/:genre/:location': 'stationRoute',
			't/:trackid': 'trackRoute',
			'*other': 'defaultRoute'
		}

	});

	return Workspace;
});
