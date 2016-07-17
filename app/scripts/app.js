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
        } );
        this.on( 'other', () => {
            this.set( 'commonRatios', !this.get( 'commonRatios' ) );
        } )
        this.on( 'submitAll', () => {
            this.calculate();
        } );
        this.calculate();
    },
    calculate: function () {
        let a = this.get( 'toSub' ),
            val = 0,
            currentMode = this.get( 'currentMode' );
        if ( currentMode == 0 ) {
            val = howWide( a.width, a.height, a.length );
        } else if ( currentMode == 1 ) {
            val = howWide.diag( a.width, a.height, a.length, a.lengthIsOnWideSide );
        }
        this.animate( 'resp', val );
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
