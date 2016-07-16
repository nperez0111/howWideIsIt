# How-Wide-Is-It
Tells you how wide a monitor is when given the dimensions and aspect ratio. Or what the size of the monitor should be to fill up a certain width or height

## Install:
### For use in your JS
`npm i how-wide-is-it --save`
### For use as CLI 
`npm i how-wide-is-it -g`


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

## CLI Options
````
How Wide Is It Cli Tool

  This Program helps determine the actual dimensions of a tv when given the
  aspect ratio and diagonal inches.

Options

  --help                Display this usage guide.
  -h, --height number   The height of the aspect ratio. Ex: 16:9 it's the 9, 4:3 it's the 3
  -w, --width number    The width of the aspect ratio. Ex: 16:9 it's the 16, 4:3 it's the 4
  -l, --length number   The length of the diagonal inches across.
````