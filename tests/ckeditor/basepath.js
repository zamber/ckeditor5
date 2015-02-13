/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* globals beforeEach, describe, it, expect, window, document */

'use strict';

var modules = bender.amd.require( 'ckeditor' );

beforeEach( function() {
	// Ensure that no CKEDITOR_BASEPATH global is available.
	delete window.CKEDITOR_BASEPATH;

	// Remove all script elements from the document.
	removeScripts();
} );

describe( 'basePath', function() {
	it( 'should work with script tags', function() {
		var CKEDITOR = modules.ckeditor;

		addScript( 'http://bar.com/ckeditor/ckeditor.js' );
		expect( CKEDITOR._getBasePath() ).to.equal( 'http://bar.com/ckeditor/' );
	} );

	it( 'should work with the CKEDITOR_BASEPATH global', function() {
		var CKEDITOR = modules.ckeditor;

		window.CKEDITOR_BASEPATH = 'http://foo.com/ckeditor/';
		expect( CKEDITOR._getBasePath() ).to.equal( 'http://foo.com/ckeditor/' );
	} );
} );

describe( 'This browser', function() {
	testUrlIsFull( '/absolute/url/ckeditor.js' );
	testUrlIsFull( '../relative/url/ckeditor.js' );

	// Browsers should convert absolute and relative URLs to full URLs.
	// If this test fails in any browser, _getBasePath() must be reviewed to deal with such case (v4 does it).
	function testUrlIsFull( url ) {
		it( 'should not keep script URLs absolute or relative', function() {
			removeScripts();

			var script = addScript( url );

			// Test if the src now contains '://'.
			expect( script.src ).to.match( /:\/\// );
		} );
	}
} );

function addScript( url ) {
	var script = document.createElement( 'script' );

	script.src = url;
	document.head.appendChild( script );

	return script;
}

function removeScripts() {
	var scripts = [].slice.call( document.getElementsByTagName( 'script' ) );
	var script;

	while ( ( script = scripts.shift() ) ) {
		script.parentNode.removeChild( script );
	}
}
