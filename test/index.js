var obj = require( './../index.js' );

console.log( obj( 16, 9, 27 ) )
console.log( obj( {
    width: 16,
    height: 9,
    diag: 27
} ) )
console.log( obj.diag( 16, 9, 23 ) )
console.log( obj.diag( 16, 9, 23, false ) )
