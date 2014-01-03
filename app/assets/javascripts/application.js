// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery.turbolinks
//= require turbolinks
//= require_tree .

var tocLinks = ( function() {
  var detectName, detectDepth;

  detectFragment = function( link, index ) {
    var name,
        title = jQuery( link ).text();

    index = index || 0;
    name = jQuery( link ).prop( "id" ) || title.replace( /\s|\./g, "_" ).replace( /[^a-zA-Z0-9_\-]/g, "" );

    if ( name === "" ) {
      name = "toc_" + index;
    }

    return name;
  };

  detectDepth = function( link, support ) {
    support = typeof support === "undefined" ? true : !!support;

    if ( support ) {
      var depth;
      depth = link.tagName.match( /h(\d+)/i );
      depth = Number( depth ? depth[ 1 ] : 1 ) - 1;

      return { marginLeft: ( 20 * depth ) + "px" };
    }
    else {
      return {};
    }
  };

  return function( options ) {
    options = jQuery.extend( {}, options );

    var container = this,
        toc       = options.toc || "div.nav-toc",
        tocLink   = [ toc, "a" ].join( " " ),
        tags      = options.tags || [ "h1", "h2" ],
        supportDepth   = options.supportDepth,
        scrollDuration = options.scrollDuration || 300;

    jQuery( document )
      .off( "click.toc_link", tocLink )
      .on( "click.toc_link", tocLink, function() {
        var fragment;
        fragment = jQuery( this ).prop( "href" ).match( /(#.+)/ );

        if ( fragment ) {
          fragment = fragment[ 1 ];

          jQuery( "html, body" ).animate( {
            scrollTop: jQuery( fragment ).offset().top
          }, scrollDuration );

          return false;
        }
      } );

    jQuery( [ toc, "ul" ].join( " " ) ).empty();

    jQuery( container )
      .find( tags.join( ", " ) )
      .each( function( idx ) {
        var fragment = detectFragment( this, idx ),
            title    = jQuery( this ).text(),
            tocList  = jQuery( [ toc, "ul" ].join( " " ) );

        jQuery( this ).prop( { id: fragment } );

        jQuery( "<li>" )
          .append(
            jQuery( "<a>" )
              .css( detectDepth( this, supportDepth ) )
              .prop( { href: [ "#", fragment ].join( "" ) } )
              .text( title )
          )
          .appendTo( tocList );
      } )
  };
} )();

jQuery.fn.tocLinks = tocLinks;
