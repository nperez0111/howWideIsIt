#! /usr/bin/env node

var getUsage = require( 'command-line-usage' ),
    commandLineArgs = require( 'command-line-args' ),
    contently = [ {
        name: 'default',
        summary: 'Use this mode if you have the aspect ratio and the diagonal. Does not need to be specified.'
    }, {
        name: 'diagonal',
        summary: "Use this mode if you have the aspect ratio and one side. The side defaults to the width but can be reversed by adding the -r flag. Usage: how-wide diagonal -w 16 -h 9 -l 23 "
    } ],
    optionDefinitions = [ {
        name: 'help',
        description: 'Display this usage guide.'
    }, {
        name: 'height',
        alias: 'h',
        typeLabel: '[underline]{number}',
        description: "The [underline]{height} of the aspect ratio. Ex: 16:9 it's the 9, 4:3 it's the 3"
    }, {
        name: 'width',
        alias: 'w',
        typeLabel: '[underline]{number}',
        description: "The [underline]{width} of the aspect ratio. Ex: 16:9 it's the 16, 4:3 it's the 4"
    }, {
        name: 'length',
        alias: 'l',
        typeLabel: '[underline]{number}',
        description: "The length of the diagonal inches across. OR if in diagonal mode the length of the width side."
    }, {
        name: 'reverse',
        alias: 'r',
        description: 'If in diagonal mode this reverses the length to be on the height side.'
    } ],
    parsedArgs = commandLineArgs( optionDefinitions ),
    argsLength = ( Object.keys( parsedArgs ).filter( function ( a ) {
        return a == 'height' || a == 'width' || a == 'length'
    } ) ).length,
    final = require( './../index.js' );

function prettyPrint( obj ) {
    console.log( getUsage( [ {
        header: 'Results for ' + obj.aspRatio + ' ' + obj.diagonal + "' TV",
        content: [ {
            desc: 'Width is:',
            example: obj.width + "'"
        }, {
            desc: 'Height is:',
            example: obj.height + "'"
        } ]
    } ] ) )
}


function printHelp() {
    console.log( getUsage( [ {
        header: 'How Wide Is It Cli Tool',
        content: 'This Program helps determine the actual dimensions of a tv when given the aspect ratio and diagonal inches.'
    }, {
        header: 'Command List',
        content: contently
    }, {
        header: 'Options',
        optionList: optionDefinitions
    } ] ) );
}

if ( process.argv.slice( 2 ).length == 3 ) {

    prettyPrint( final.apply( null, process.argv.slice( 2 ).map( function ( a ) {
        return parseFloat( a );
    } ) ) );

} else if ( argsLength !== 3 || parsedArgs.help === true || ( Object.keys( parsedArgs ).length == 1 && parsedArgs.height === true ) ) {

    printHelp();

} else {

    prettyPrint( final( parseFloat( parsedArgs.width ), parseFloat( parsedArgs.height ), parseFloat( parsedArgs.length ) ) )

}
