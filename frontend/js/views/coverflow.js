/*global define*/
define([
	'jquery',
	'underscore',
	'backbone'
], function ($, _, Backbone) {
	'use strict';

	var CoverFlowView = Backbone.View.extend({

		el: '#coverflow',

		initialize: function(){
			this.canvas = document.getElementById("coverflow");
			this.context = this.canvas.getContext('2d');
			this.canvas.width = $("#coverflow").width();
			this.canvas.height = $("#coverflow").height();

			var that = this;
			///THIS SETTIMEOUT IS HACKY BULLSHIT
			setTimeout(function(){
				that.model.collection.forEach(function(el,idx,list){
					console.log(idx)
					var imageObj = new Image();
					imageObj.onload = function() {
						that.context.drawImage(imageObj,that.canvas.height*idx,0,that.canvas.height,that.canvas.height);
					};
					imageObj.src = el.get("track").artwork_url;
					
				})

			},1000)


			// this.context.fillStyle="#FF0000";
			// this.context.fillRect(0,0,this.canvas.height,this.canvas.height);
			// this.context.fillStyle="green";
			// this.context.fillRect(this.canvas.height,0,this.canvas.height,this.canvas.height);
			// this.context.fillStyle="blue";
			// this.context.fillRect(this.canvas.height*2,0,this.canvas.height,this.canvas.height);
		},



	});

	return CoverFlowView;

});