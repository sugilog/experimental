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

jQuery( function() {
  jQuery( document )
    .off( "click.toc_link", "div.nav-toc a" )
    .on( "click.toc_link", "div.nav-toc a", function() {
      var fragment = jQuery( this ).attr( "href" );

      jQuery( "html, body" ).animate( {
        scrollTop: jQuery( fragment ).offset().top
      }, 1000 );

      return false;
    } );

  jQuery( "div.nav-toc ul" ).empty();

  jQuery( "div.container" )
    .find( "h1, h2" )
    .each( function( idx ) {
      var title = jQuery( this ).text(),
          name  = jQuery( this ).prop("id") || title.replace(/\s|\./g, "_").replace(/[^a-zA-Z0-9_\-]/g, ""),
          depth = Number( this.tagName.match(/h(\d+)/i)[1] || 1 ) - 1;

      if ( name === "" ) {
        name = "toc_" + idx;
      }

      jQuery( this ).prop( { id: name } );

      jQuery( "<li>" )
        .append(
          jQuery( "<a>" )
            .css( { marginLeft: ( 20 * depth ) + "px" } )
            .prop( { href: "#" + name } )
            .text( title )
        )
        .appendTo(
          jQuery( "div.nav-toc ul" )
        );
    } )

  jQuery('body').scrollspy({ target: '.nav-toc' })
} );
