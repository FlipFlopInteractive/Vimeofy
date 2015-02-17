/*
 *  jQuery-Vimeo-player - v0.3.0
 *  Vimeo player for jQuery inspired by Pupunzi's jquery.mb.ytplayer
 *  https://github.com/FlipFlopInteractive/jquery-vimeo-player
 *
 *  Made by Koen Dirk van Esterik
 *  Under MIT License
 */
!( function( $, window, document, navigator ){

    "use strict";

    function VimeoPlayer( element ){

        this.$element = $( element );

        this.init();
    }

    VimeoPlayer.prototype.init = function(){

        var player = this;

        player.$iframe = $( '<iframe src="//player.vimeo.com/video/119705174?title=0&amp;byline=0&amp;portrait=0&amp;color=4ad9d9&amp;autoplay=1&amp;loop=1" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>' );

        player.$element.append( player.$iframe );
    }


})( window.jQuery, window, document, navigator );