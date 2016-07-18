'use strict';

const Ract = require( 'ractive/ractive.min' ),
    howWide = require( 'how-wide-is-it' );
howWide.truncate = 3;
window.main = new Ract( {
    template: require( './mainView.ract' ).template,
    el: '.hook',
    oncomplete: function () {
        console.log( 'we good in the hood' );
        this.on( 'setMode', ( event, modeToSetTo ) => {
            this.set( 'currentMode', modeToSetTo );
            this.calculate();
        } );
        this.on( 'other', () => {
            this.set( 'commonRatios', !this.get( 'commonRatios' ) );
        } );
        this.on( 'setRatio', ( event, width ) => {
            this.set( 'toSub.width', Number( width.split( ':' )[ 0 ] ) );
            this.set( 'toSub.height', Number( width.split( ':' )[ 1 ] ) );
            this.calculate();
        } );
        this.on( 'submitAll', () => {
            this.calculate();
        } );
        this.calculate();
        window.onresize = debounce( () => {
            var temp = this.get( 'toSub.length' );
            console.log( temp )
            this.set( 'toSub.length', temp - 0.1 ).then( () => {
                this.calculate( true ).then( () => {
                    this.set( 'toSub.length', temp ).then( () => {
                        this.calculate( true );
                    } );
                } );
            } );

        }, 50 );
    },
    calculate: function ( quick ) {
        let a = this.get( 'toSub' ),
            val = 0,
            currentMode = this.get( 'currentMode' );
        if ( currentMode == 0 ) {
            val = howWide( a.width, a.height, a.length );
        } else if ( currentMode == 1 ) {
            val = howWide.diag( a.width, a.height, a.length, a.lengthIsOnWideSide );
        }
        return quick ? this.set( 'resp', val ) : this.animate( 'resp', val );
    },
    data: () => {
        return {
            toSub: {
                width: 16,
                height: 9,
                length: 21,
                lengthIsOnWideSide: true
            },
            currentMode: 0,
            allModes: [ 'calculateWithDiagonal', 'calculateWithSide' ],
            resp: {
                height: 11.8125,
                width: 21,
                aspRatio: '16:9',
                diagonal: 24.0942971727751392
            },
            isSet: function ( w, h ) {
                return ( w == this.get( 'toSub.width' ) && h == this.get( 'toSub.height' ) ) ? 'isSet' : '';
            },
            isActive: function ( cur ) {
                let val = cur == 'diag' ? 0 : 1;
                return this.get( 'currentMode' ) == val ? 'isActive' : '';
            },
            commonRatios: true
        }
    },
    components: {
        displayresults: Ract.extend( require( './results.ract' ) )
    }
} );

function debounce( func, wait, immediate ) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        var later = function () {
            timeout = null;
            if ( !immediate ) func.apply( context, args );
        };
        var callNow = immediate && !timeout;
        clearTimeout( timeout );
        timeout = setTimeout( later, wait );
        if ( callNow ) func.apply( context, args );
    };
};
