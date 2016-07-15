# How-Wide-Is-It
Tells you how wide a monitor is when given the dimensions and aspect ratio. Or what the size of the monitor should be to fill up a certain width or height

## Example:

###How Wide is a 27" monitor that is 16:9?

````JS
var actualSize = require( 'how-wide-is-it' );
console.log( actualSize( 16, 9, 27 ) );

{ 
	height: 13.237053470079092,
	width: 23.53253950236283,
	aspRatio: '16:9',
	diagonal: 27 
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
	diagonal: 27 
}

````

###What size monitor would fill up a 23" space that is 16:9?


````JS

var actualSize = require( 'how-wide-is-it' );
console.log( actualSize.diag( 16, 9, 23 ) );

{ 
  height: 12.9375,
  width: 23,
  aspRatio: '16:9',
  diagonal: 26.388992141610863
  }
  
console.log( actualSize.diag( {
  width:16,
  height:9,
  length:23,
  lengthIsOnWideSide:true
} ) );

{ 
  height: 12.9375,
  width: 23,
  aspRatio: '16:9',
  diagonal: 26.388992141610863
  }
````