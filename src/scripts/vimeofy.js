/*
 *  Vimeofy - v0.3.0
 *  jQuery plugin that applies a Vimeo player to a DOM element, inspired by Pupunzi's jquery.mb.ytplayer and VodkaBears' Vide.
 *  https://github.com/FlipFlopInteractive/Vimeofy
 *
 *  Made by Koen Dirk van Esterik
 *  Under MIT License
 */
!( function( $, window, document, navigator ){

	'use strict';


	/**
	 * Vimeofy settings
	 * @private
	 */
	var pluginName 	= 'vimeofy';
	var isIOS 		= /iPad|iPhone|iPod/i.test( navigator.userAgent );
	var isAndroid 	= /Android/i.test( navigator.userAgent );



	/**
	 * Vimeofy constructor
	 * @param {HTMLElement} element
	 * @param {Object|String} path
	 * @constructor
	 */
	function Vimeofy( element, options ){

		this.$element = $( element );
		this.url = parseUrl( options );
		this.init();
	}



	/**
	 * Parse string with options
	 * @param {Object} options
	 * @returns {String}
	 * @private
	 */
	function parseUrl( options ){

		var url 		= options.url.replace( /(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com)\/(.+)/g, '//player.vimeo.com/video/$1' );
		var color		= options.color.replace( /^#/, '?color=' );
		var autoplay	= options.autoplay ? '&amp;autoplay=1' : '&amp;autoplay=0';
		var loop 		= options.loop ? '&amp;loop=1' : '&amp;loop=0';

		return url + color + autoplay + loop;
	}



	/**
	 * Initialization
	 * @public
	 */
	Vimeofy.prototype.init = function(){

		var vimeofy = this;

		// vide.$element.prepend(vide.$wrapper);

		if( !isIOS && !isAndroid ){

			// Declare player instance
			vimeofy.$player = $( '<iframe frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>' );
			vimeofy.$player.attr( 'src', vimeofy.url );

			// Append player
			vimeofy.$element.append( vimeofy.$player );

			// Disable visibility, while loading
			vimeofy.$player.css( 'visibility', 'hidden' );

			$f( vimeofy.$player[ 0 ] ).addEvent( 'ready', function(){

				vimeofy.resize();

				// TODO: Remove flicker when iframe is initiating
				vimeofy.$player.css( 'visibility', 'visible' );
			});

			// resize event is available only for 'window',
			// use another code solutions to detect DOM elements resizing
			vimeofy.$element.bind( 'resize.' + pluginName, function(){

				vimeofy.resize();
			});
		}
	};


	/**
	 * Resize Vimeo player
	 * @public
	 */
	Vimeofy.prototype.resize = function(){

		if( this.$player ){

			var width 		= this.$element.outerWidth();
			var height 		= this.$element.outerHeight();
			var margin 		= 24;
			var overprint 	= 4;
			var props 		= {};

			props.width 		= width + (( width * margin ) / 100 );
			props.height 		= Math.ceil(( 9 * width ) / 16 );
			props.marginTop 	= -(( props.height - height ) / 2 );
			props.marginLeft 	= -(( width * ( margin / 2 )) / 100 );

			if( props.height < height ){

				props.height 		= height + (( height * margin ) / 100 );
				props.width 		= Math.floor(( 16 * height ) / 9 );
				props.marginTop 	= -(( height * ( margin / 2 )) / 100 );
				props.marginLeft 	= -(( props.width - width ) / 2 );
			}

			props.width += overprint;
			props.height += overprint;
			props.marginTop -= overprint / 2;
			props.marginLeft -= overprint / 2;

			this.$player.css({ width: props.width, height: props.height, marginTop: props.marginTop, marginLeft: props.marginLeft });
		}
	};



	/**
	 * Destroy video background
	 * @public
	 */
	Vimeofy.prototype.destroy = function(){

		this.$element.unbind( pluginName );

		if( this.$player ){

			this.$player.unbind( pluginName );
		}

		delete $[ pluginName ].lookup[ this.index ];
		this.$element.removeData( pluginName );
		this.$player.remove();
	};



	/**
	 * Special plugin object for instances.
	 * @type {Object}
	 * @public
	 */
	$[ pluginName ] = {

		lookup: []
	};



	/**
	 * Plugin constructor
	 * @param {Object|String} path
	 * @param {Object|String} options
	 * @returns {JQuery}
	 * @constructor
	 */
	$.fn[ pluginName ] = function( path ){

		var instance;

		this.each( function() {

			instance = $.data( this, pluginName );

			if( instance ){

				// destroy plugin instance if exists
				instance.destroy();
			}

			// create plugin instance
			instance = new Vimeofy( this, path );
			instance.index = $[ pluginName ].lookup.push( instance ) - 1;
			$.data( this, pluginName, instance );
		});

		return this;
	};



	$( document ).ready( function(){

		$( window ).bind( 'resize.' + pluginName, function(){

			for( var len = $[ pluginName ].lookup.length, i = 0, instance; i < len; i++ ){

				instance = $[ pluginName ].lookup[ i ];

				if( instance ){

					instance.resize();
				}
			}
		});
	});


})( window.jQuery, window, document, navigator );