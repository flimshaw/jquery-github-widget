/*!
 * jQuery Github Widget
 * Original author: @Joe8Bit
 * Licensed under the MIT license
 */
;(function ( $, window, document, undefined ) {
	// Create the defaults once
	var pluginName = 'github',
		defaults = {
			user: "joepettersson",
			show_extended_info: true,
			show_follows: true,
			width: "450px",
			show_repos: 10,
			oldest_first: false
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
				user = this.user(options.user, function(data){
					$(el).append(Github.prototype.layout(data.data, options));
				});
				repos = this.repos(options.user, function(data){
					Github.prototype.renderRepos(data, options);
				});
		},

		user: function(user, callback) {
			$.getJSON("https://api.github.com/users/" + user.toLowerCase() + "?callback=?", function(data){
				if(typeof callback !== "undefined" && typeof callback === "function") {
					callback(data);
				}
			});
		},

		layout: function(user, options) {
			console.log(user);
			var markup = '';
				markup += '<div id="github" style="width: ' + options.width + '">';
				markup += '<div id="header" class="clear">';
				markup += '<div id="logo"><a href="https://github.com/">Github</a></div>';
				markup += '<div id="user"><a href="' + user.html_url + '" id="github-user">';
				if (typeof user.avatar_url !== "undefined" && user.avatar_url.length > 0){
					markup += '<img src="' + user.avatar_url + '" alt="Avatar" width="34px" height="34px" />';
				} else {
					markup += '<img src="https://a248.e.akamai.net/assets.github.com/images/gravatars/gravatar-140.png" alt="Avatar" width="34px" height="34px" />';
				}
				markup += '</a></div>';
				if(options.show_extended_info === true){
					markup += '<div id="extended-user-info">';
					if (typeof user.name !== "undefined" && user.name.length > 0){
						markup += '<p class="name">' + user.name + '</p>';
					}
					markup += '<p class="place">';
					if (typeof user.company !== "undefined" && user.company.length > 0){
						markup += user.company + ' ' ;
					}
					if (typeof user.location !== "undefined" && user.location.length > 0){
						markup += user.location;
					}
					markup += '</p>';
					if (typeof user.bio !== "undefined" && user.bio.length > 0){
						markup += '<p class="bio">' + user.bio + '</p>';
					}
					if (user.hireable === true){
						markup += '<p class="hireable">I\'m availabe for hire!</p>';
					}
					markup += '<span class="repos">' + user.public_repos + ' repos</span>';
					markup += '<span class="gists">' + user.public_gists + ' gists</span>';
					markup += '</div>';
				}
				if (options.show_follows === true){
					markup += '<div id="github-followers"><a href="https://github.com/' + user.login.toLowerCase() + '/followers" id="current-followers">' + user.followers + ' followers</a></div>';
				}
				markup += '</div>';
				markup += '<div id="repos"><div id="github-loader"></div><ul></ul></div>';
				markup += '</div>';
				return markup;
		},

		repos: function(user, callback) {
			$.getJSON("https://api.github.com/users/" + user.toLowerCase() + "/repos?callback=?", function(data){
				if(typeof callback !== "undefined" && typeof callback === "function") {
					callback(data);
				}
			});
		},

		renderRepos: function(data, options) {
			console.log(data)
			var markup = '';
			if (options.oldest_first === true){
				var data = data.data.reverse()
			} else {
				var data = data.data;
			}
			$.each(data, function(i){
				if (i <= options.show_repos - 1){
					markup += '<li>';
					markup += '<p class="title"><a href="' + this.html_url + '">' + this.name + '</a></p>';
					markup += '<p class="meta-data">';
					if (this.language !== null){
						markup += '<span class="language">' + this.language + '</span></p>';
					}
					markup += '</li>';
				}
			});
			$("#repos ul").append(markup);
			$("#repos #github-loader").fadeOut(250, function(){
				$("#repos ul").slideDown(250);
			});
			Github.prototype.bind(options);
		},

		bind: function(options) {
			if (options.show_extended_info === true){
				$("#github-user").hover(function(){
					$("#github #header #extended-user-info").fadeIn(250);
				}, function(){
					$("#github #header #extended-user-info").fadeOut(250);
				});
			}
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
