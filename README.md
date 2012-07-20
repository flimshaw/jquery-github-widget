#jQuery Github Widget

* [Documentation](http://www.joepettersson.com/jquery-github-widget/)
* [Demos](http://www.joepettersson.com/jquery-github-widget/)
* [@Joe8Bit](http://twitter.com/Joe8Bit/)

###Questions?

--------
For general questions, find me on [Twitter](http://twitter.com/Joe8Bit/). For issues or feature requests and general questions, please use the [issues](https://github.com/JoePettersson/jquery-github-widget) page. 

###Usage

--------

Using the GitHub widget is super simple, you just need to include the script after the core jQuery library and then set it up in the following way within the <code>&lt;head></code> of your page and tell it which element on the page you want the widget to appended to:

    <script src="jquery.min.js"></script>
    
	<script src="jquery.github.min.js"></script>
	
	<script type="text/javascript">
		$(document).ready(function(){
			$("#some-element").github({
				user: "joepettersson"
			});
		});
	</script>

The only required option is the user name of the Github user you want the widget to represent. You don't have to worry about capitalisation, as the plugin normalises the  username.

**Note:** if you do not specify a username when running the plugin, it will list me instead, as I a set as the default.

**If you want use the default style for the widget, and I assume you do, then you also need to include the provided stylesheet and image sprite (within this repo).** 

###Options

--------

All of the options specified below are optional and do not need to be set in order for the plugin to work. However, described below are the full set of different options, their accepted parameters and their type:

    $("#some-element").github({
		user: "joepettersson",
		show_extended_info: true,
		show_follows: true,
		width: "400px",
		show_repos: 10,
		oldest_first: false
	});
	
#####Show extended info
    show_extended_info
    	Accepted parameters: true/false

Within the header of the Github widget is the users avatar (if it exists), when hovering over it a menu pops up showing extended info for that user. This behaviour can be turned off by setting this option to <code>false</code>.

#####Show follows
    show_follows
    	Accepted parameters: true/false

Underneath the users name in the header of the widget is an area displaying the number of followers the user has. This behaviour can be turned off by setting this parameter to <code>false</code>.

#####Width
    width
    	Accepted parameters: A string representing a custom width for the widget, in CSS compliant units (px/%/em/pt)
    	
The default width of the widget is 400px, and I wouldn't recommend setting this below about 250px as the layout starts to look a little weird.

#####Show repos
    show_repos
    	Accepted parameters: number/integer

The number of repos you wish to display within the widget, with a maximum of 30. This is a limit set by Github for one page of their API, you can get more but if you want to show more than 30 in a simple widget like this you're probably not getting the best use out of it anyway. The default is 10.

#####Oldest first
    oldest_first
    	Accepted parameters: true/false

As a default the widget prints a users repos with the recent first, as they are provided by Github, but if you would like to reverse the order (showing the oldest first) you should set this parameter to <code>true</code>.

###FAQ

--------

**Q. Can I have more than one widget per page?**    
A. Yes. No problem, just attach them to more than one element on the page.

**Q. What browsers does this function in?**    
A. This widget functions properly in *modern* browsers, and the default style uses many CSS3 features that will not work for legacy browsers (<IE9 I'm looking at you!). However, I've made some effort to support legacy browsers in the CSS so it shouldn't look too crappy. Apart from that there is no reason it shouldn't work fine in legacy browsers.

**Q. Should I strive to achieve all my goals in life and sacrifice a social life or breeze through life having fun?**    
A. Only questions related to the plugin please. I'm not your therapist. But the second one. 


###Minifying
-----
If you'd like to modify the development verision of the plugin, you need to use the NodeJS NPM module [UglifyJS](https://github.com/mishoo/UglifyJS/). Run if with the following flags, so as to prevent function/variable name munging:

    uglifyjs -nmf jquery.github.js
   