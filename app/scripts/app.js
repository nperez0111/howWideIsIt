'use strict';

const Ract = require( 'ractive/ractive.min' ),
    howWide = require( 'how-wide-is-it' );
window.main = new Ractive( {
    template: require( './mainView.ract' ).template,
    el: '.hook',
    oncomplete: () => {
        console.log( 'we good in the hood' );
        this.on( 'submitAll', () => {
            this.calculate();
        } );
    },
    data: () => {
        return {
            toSub: {
                width: 16,
                height: 9,
                length: 21
            },
            currentMode: 0,
            allModes: [ 'calculateWithDiagonal', 'calculateWithSide' ],
        }
    }
} );
