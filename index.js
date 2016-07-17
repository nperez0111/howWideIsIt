function computeUnit( aspWidth, aspHeight, lengthDiag ) {
    var c = Math.pow( lengthDiag, 2 ),
        b = Math.pow( aspHeight, 2 ),
        a = Math.pow( aspWidth, 2 );
    return Math.sqrt( c / ( a + b ) );
}

function computeWidth( aspWidth, aspHeight, lengthDiag ) {
    return computeUnit( aspWidth, aspHeight, lengthDiag ) * aspWidth;
}

function computeHeight( aspWidth, aspHeight, lengthDiag ) {
    return computeUnit( aspWidth, aspHeight, lengthDiag ) * aspHeight;
}

function computeDiag( aspW, aspH, length, bool ) {
    var val = length,
        multiplier = aspW / aspH;
    if ( bool ) {
        multiplier = 1 / multiplier;
    }
    return Math.sqrt( Math.pow( length, 2 ) + Math.pow( val * multiplier, 2 ) );
}

function preReqsNoGood( arr ) {
    return arr.reduce( function ( a, cur ) {
        return a || Number( cur ) !== cur;
    }, false );
}

module.exports = function ( aspWidth, aspHeight, lengthDiag ) {
    var aspWidth = aspWidth,
        aspHeight = aspHeight,
        lengthDiag = lengthDiag;
    if ( aspHeight === undefined && lengthDiag === undefined ) {
        aspHeight = aspWidth.height;
        lengthDiag = aspWidth.diag;
        aspWidth = aspWidth.width;
    }
    if ( preReqsNoGood( [ aspWidth, lengthDiag, aspHeight ] ) ) {
        return undefined;
    }
    return {
        height: computeHeight( aspWidth, aspHeight, lengthDiag ).toFixed( module.exports.truncate ),
        width: computeWidth( aspWidth, aspHeight, lengthDiag ).toFixed( module.exports.truncate ),
        aspRatio: aspWidth + ':' + aspHeight,
        diagonal: ( lengthDiag ).toFixed( module.exports.truncate )
    }
}

module.exports.diag = function ( aspWidth, aspHeight, length, isWidth ) {
    var isWidth = isWidth === undefined ? true : isWidth;
    if ( aspHeight === undefined && length === undefined ) {
        aspHeight = aspWidth.height;
        length = aspWidth.length;
        isWidth = 'lengthIsOnWideSide' in aspWidth ? aspWidth.lengthIsOnWideSide : isWidth;
        aspWidth = aspWidth.width;

    }
    var lengthDiag = computeDiag( aspWidth, aspHeight || 0, length || 0, isWidth );

    if ( preReqsNoGood( [ aspWidth, length, aspHeight ] ) ) {
        console.warn( 'Values inputted are not correct, if first value is an object check documentation for proper object input.', [ aspWidth, length, aspHeight ] );

        return undefined;
    }
    return {
        height: parseNum( isWidth ? aspHeight * length / aspWidth : length ),
        width: parseNum( isWidth ? length : aspWidth * length / aspHeight ),
        aspRatio: aspWidth + ':' + aspHeight,
        diagonal: parseNum( lengthDiag )
    }
}

function parseNum( num ) {
    return Number( num.toFixed( module.exports.truncate ) );
}

module.exports.truncate = 16;
