/*!
 * jQuery Github Widget
 * Original author: @Joe8Bit
 * Licensed under the MIT license
 */
;(function ( $, window, document, undefined ) {
	// Create the defaults once
	var pluginName = 'github',
		defaults = {
			user: "joepettersson"
		};

	// The actual plugin constructor
	function Github ( element, options ) {
		this.element = element;
		this.options = $.extend( {}, defaults, options) ;

		this._defaults = defaults;
		this._name = pluginName;

		this.init();
	}

	Github.prototype = {
		
		init: function () {
			var el = this.element,
				options = this.options,
				markup = "",
				user = this.user(options.user, function(data){
					console.log(data);
				}),
				repos = this.repos(options.user, function(data){
					console.log(data);
				});
		},

		user: function(user, callback) {
			$.getJSON("https://api.github.com/users/" + user.toLowerCase() + "?callback=?", function(data){
				if(typeof callback !== "undefined" && typeof callback === "function") {
					callback(data);
				}
			});
		},

		repos: function(user, callback) {
			$.getJSON("https://api.github.com/users/" + user.toLowerCase() + "/repos?callback=?", function(data){
				if(typeof callback !== "undefined" && typeof callback === "function") {
					callback(data);
				}
			});
		}

	};

	$.fn[pluginName] = function ( options ) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName,
				new Github( this, options ));
			}
		});
	}

})( jQuery, window, document );
