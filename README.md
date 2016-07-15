# How-Wide-Is-It
Tells you how wide a monitor is when given the dimensions and aspect ratio.

## Example:
````JS
var actualSize = require( 'how-wide-is-it' );
console.log( actualSize( 16, 9, 27 ) );

{ 
	height: 13.237053470079092,
	width: 23.53253950236283,
	aspRatio: '16:9',
	diaganol: 27 
}

console.log( actualSize( {
    width: 16,
    height: 9,
    diag: 27
} ) )

{ 
	height: 13.237053470079092,
	width: 23.53253950236283,
	aspRatio: '16:9',
	diaganol: 27 
}

````