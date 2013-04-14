/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/bandInfo.html'
], function ($, _, Backbone, BandInfoTemplate) {
	'use strict';

	var BandInfoView = Backbone.View.extend({

		el: '#bandInfo',

		template: _.template(BandInfoTemplate),

		initialize: function(){
		},

		render: function(){
			var that = this;
			this.$el.animate({opacity:0},200,function(){
				that.$el.html(that.template({
					current: that.model.get("current").toJSON()
				}));
				that.$el.animate({opacity:1},200);
			});

		}

	});

	return BandInfoView;

});