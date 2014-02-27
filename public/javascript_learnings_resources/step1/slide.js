jQuery.fn.html2slide = function() {
  var util, slide, sections, css;

  util = {
    margin: 10,
    updateDoc: function() {
      jQuery( "body" ).css( { margin: this.margin, padding: 0 } );
    },
    updateCss: function() {
      css.height = jQuery( window ).height() - this.margin * 2;
      css.width  = jQuery( window ).width() - this.margin * 2;
      sections.css( css );
    },
    next: function() {
      var current, target, idx;

      sections.each( function( i ) {
        if ( jQuery( this ).data().active ) {
          current = this;
          idx = i;
        }
      });

      util.inactivate( current );
      target = typeof idx === "undefined" ? sections.eq( 0 ) : sections.eq( idx + 1 );
      target = target.length === 0 ? sections.eq( 0 ) : target;
      util.activate( target );
    },
    activate: function( _section ) {
      jQuery( _section ).data().active = true;
      jQuery( _section ).show();
    },
    inactivate: function( _section ) {
      if ( _section ) {
        jQuery( _section ).data().active = false;
        jQuery( _section ).hide();
      }
    },
    events: {
      bind: function() {
        var key;
        this.resize( "on" );
        this.click( "on" );
      },
      resize: function( type ) {
        jQuery( window )[ type ]( "reize", function() {
          util.updateCss();
        });
      },
      click: function( type ) {
        sections[ type ]( "click", function() {
          util.next();
        });
      }
    }
  };

  css = {
    width:         "100%",
    verticalAlign: "middle",
    textAlign:     "center",
    boxShadow:     "rgba(100, 100, 100, 0.5) 0px 0px 5px 5px",
    display:       "table-cell"
  };

  sections = jQuery( this );

  util.updateDoc();
  util.updateCss();
  sections.hide();

  util.next();
  util.events.bind();
};
