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
        height: computeHeight( aspWidth, aspHeight, lengthDiag ).toFixed( module.exports.truncate ),
        width: computeWidth( aspWidth, aspHeight, lengthDiag ).toFixed( module.exports.truncate ),
        aspRatio: aspWidth + ':' + aspHeight,
        diagonal: ( lengthDiag ).toFixed( module.exports.truncate )
    }
}

module.exports.diag = function ( aspWidth, aspHeight, length, isWidth ) {
    var aspWidth = aspWidth,
        aspHeight = aspHeight,
        isWidth = isWidth === undefined ? true : isWidth,
        lengthDiag = computeDiag( aspWidth, aspHeight || 0, length || 0, isWidth );
    if ( aspHeight === undefined && length === undefined && isWidth === undefined ) {
        aspHeight = aspWidth.height;
        length = aspWidth.length;
        isWidth = aspWidth.lengthIsOnWideSide;
        aspWidth = aspWidth.width;
        lengthDiag = computeDiag( aspWidth, aspHeight || 0, length || 0, isWidth );
    }
    return {
        height: ( isWidth ? aspHeight * length / aspWidth : length ).toFixed( module.exports.truncate ),
        width: ( isWidth ? length : aspWidth * length / aspHeight ).toFixed( module.exports.truncate ),
        aspRatio: aspWidth + ':' + aspHeight,
        diagonal: ( lengthDiag ).toFixed( module.exports.truncate )
    }
}

module.exports.truncate = 16;
