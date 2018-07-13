var SpeechNotes = (function() {
    var speechWindow;


    function openWindow() {
        var jsFileLocation = document.querySelector('script[src$="speech.js"]').src;  // this js file path
        var speechTemplate;

        jsFileLocation = jsFileLocation.replace(/speech\.js(\?.*)?$/, '');   // the js folder path
        speechTemplate = jsFileLocation + 'speech.html';
        speechWindow = window.open(speechTemplate, 'reveal.js - Speech notes', 'width=1100,height=700');

        speechWindow.Reveal = this.Reveal;

        // Keep trying to connect until we get a 'connected' message back
        var connectInterval = setInterval( function() {
            speechWindow.postMessage( JSON.stringify( {
                namespace: 'speech',
                init: true,
                url: window.location.protocol + '//' + window.location.host + window.location.pathname + window.location.search,
                state: Reveal.getState()
            } ), '*' );
        }, 500 );

        window.addEventListener( 'message', function( event ) {
            var data = JSON.parse( event.data );
            if( data && data.namespace === 'speech' && data.type === 'connected' ) {
                clearInterval( connectInterval );
            }
        } );

    }

    window.addEventListener('keyup', function(event) {
        if(!speechWindow && event.code === 'KeyD') {
            openWindow();

            Reveal.addEventListener( 'slidechanged', sendMessage );
            Reveal.addEventListener( 'fragmentshown', sendMessage );
            Reveal.addEventListener( 'fragmenthidden', sendMessage );
            Reveal.addEventListener( 'overviewhidden', sendMessage );
            Reveal.addEventListener( 'overviewshown', sendMessage );
            Reveal.addEventListener( 'paused', sendMessage );
            Reveal.addEventListener( 'resumed', sendMessage );
        }
    });

    function sendMessage() {
        var slideElement = Reveal.getCurrentSlide(),
            speechElement = slideElement.querySelector( 'aside.speech' ),
            fragmentElement = slideElement.querySelector( '.current-fragment' ),
            fragmentSpeech;

        var messageData = {
            namespace: 'speech',
            url: window.location.protocol + '//' + window.location.host + window.location.pathname + window.location.search,
            state: Reveal.getState()
        };

        if( fragmentElement ) {
            fragmentSpeech = fragmentElement.querySelector( 'aside.speech' );
            if( fragmentSpeech ) {
                speechElement = fragmentSpeech;
            }
        }

        if( speechElement ) {
            messageData.speechSynthesis = speechElement.innerHTML;
        }

        speechWindow.postMessage( JSON.stringify( messageData ), '*' );
    }

    return {
        open: openWindow
    }
})();