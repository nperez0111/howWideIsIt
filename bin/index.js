#! /usr/bin/env node

var getUsage = require( 'command-line-usage' ),
    commandLineArgs = require( 'command-line-args' ),
    contently = [ {
        name: 'default',
        summary: 'Use this mode if you have the aspect ratio and the diagonal. Does not need to be specified.'
    }, {
        name: 'diagonal',
        summary: "Use this mode if you have the aspect ratio and one side. The side defaults to the width but can be reversed by adding the -r flag. Usage: how-wide --diag -w 16 -h 9 -l 23 "
    } ],
    optionDefinitions = [ {
        name: 'help',
        description: 'Display this usage guide.'
    }, {
        name: 'width',
        alias: 'w',
        typeLabel: '[underline]{number}',
        description: "The [underline]{width} of the aspect ratio. Ex: 16:9 it's the 16, 4:3 it's the 4"
    }, {
        name: 'height',
        alias: 'h',
        typeLabel: '[underline]{number}',
        description: "The [underline]{height} of the aspect ratio. Ex: 16:9 it's the 9, 4:3 it's the 3"
    }, {
        name: 'length',
        alias: 'l',
        typeLabel: '[underline]{number}',
        description: "The length of the diagonal inches across. OR if in diagonal mode the length of the width side."
    }, {
        name: 'diag',
        alias: 'd',
        description: 'Sets the mode to be in diagonal mode meaning we are searching for the diagonal of the screen.'
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
    } ] ) );
}

function warnPrior( obj ) {
    console.log( getUsage( [ {
        header: 'Diagonal Length is: ' + obj.diagonal,
        content: [ {
            desc: '',
            example: ''
        } ]
    } ] ) );
    return obj;
}

function printHelp() {
    console.log( getUsage( [ {
        header: 'How Wide Is It Cli Tool',
        content: 'This Program helps determine the actual dimensions of a tv when given the aspect ratio and diagonal inches.'
    }, {
        header: 'Possible Modes',
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

} else if ( process.argv.slice( 2 ).length == 4 && process.argv.slice( 2 ).indexOf( '-d' ) > -1 ) {
    var val = process.argv.slice( 2 );
    val.splice( val.indexOf( '-d' ), 1 );
    prettyPrint( warnPrior( final.diag.apply( null, val.map( function ( a ) {
        return parseFloat( a );
    } ) ) ) );

} else if ( argsLength !== 3 || parsedArgs.help === true || ( Object.keys( parsedArgs ).length == 1 && parsedArgs.height === true ) ) {

    printHelp();

} else {
    if ( parsedArgs.diag == true ) {
        prettyPrint( warnPrior( final.diag( parseFloat( parsedArgs.width ), parseFloat( parsedArgs.height ), parseFloat( parsedArgs.length ), parsedArgs.reverse === undefined ? true : parsedArgs.reverse ) ) );
    } else {
        prettyPrint( final( parseFloat( parsedArgs.width ), parseFloat( parsedArgs.height ), parseFloat( parsedArgs.length ) ) )
    }
}
