var memo = require( 'memoize' );

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

module.exports = function ( aspWidth, aspHeight, lengthDiag ) {
    var aspWidth = aspWidth,
        aspHeight = aspHeight,
        lengthDiag = lengthDiag;
    if ( aspHeight === undefined && lengthDiag === undefined ) {
        aspHeight = aspWidth.height;
        lengthDiag = aspWidth.diag;
        aspWidth = aspWidth.width;
    }
    return {
        height: computeHeight( aspWidth, aspHeight, lengthDiag ),
        width: computeWidth( aspWidth, aspHeight, lengthDiag ),
        aspRatio: aspWidth + ':' + aspHeight,
        diaganol: lengthDiag
    }
}
