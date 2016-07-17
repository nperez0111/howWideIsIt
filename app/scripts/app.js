'use strict';

const Ract = require( 'ractive/ractive.min' ),
    howWide = require( 'how-wide-is-it' );
window.main = new Ract( {
    template: require( './mainView.ract' ).template,
    el: '.hook',
    oncomplete: function () {
        console.log( 'we good in the hood' );
        this.on( 'submitAll', () => {
            this.calculate();
        } );
    },
    calculate: function () {
        var a = this.get( 'toSub' );
        this.set( 'resp', howWide.diag( a.width, a.height, a.length, a.lengthIsOnWideSide ) )
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
            }
        }
    }
} );
