/*
 * grunt-i18n-properties
 * https://github.com/Aconex/grunt-i18n-properties
 *
 * Copyright (c) 2014 Ben Birch
 * Licensed under the MIT license.
 */

(function() {

	'use strict';

	module.exports = function(grunt) {

		var parser = require('properties-parser');

		grunt.registerMultiTask('i18n', 'Convert i18n java .properties files to javascript', function() {

			var options = this.options({
				process: function( properties, lang) { return JSON.stringify( properties ); },
				primary: "en",
				langs: [ "en_AU" ],
				dest: "strings/{lang}/{bundle}.json",
			});

			var files = Array.prototype.concat.apply( [], this.files.map( function( group ) {
				return group.src;
			}));

			var primary = options.primary;
			var langs = options.langs.map( function( lang ) {
				var order = [];
				if( primary && lang.indexOf( primary ) !== 0 ) {
					order.push( primary);
				}
				order.push( lang.slice(0,2) );
				if( lang.length === 5 ) {
					order.push( lang );
				}
				return {
					key: lang,
					order: order
				};
			});

			var bundles = {};
			var re = /^(.*)\/([^\/]+)_([a-z]{2}(_[A-Z]{2})?).properties$/;

			files.forEach( function( file ) {
				var properties = parser.parse( grunt.file.read( file ) );
				var parts = file.match( re );
				var bundleId = parts[2];
				var lang = parts[3];

				bundles[ bundleId ] = bundles[ bundleId ] || {};
				bundles[ bundleId ][ lang ] = properties;
			});

			var bundleIds = Object.keys( bundles );

			bundleIds.forEach( function( bundleId ) {
				langs.forEach( function( lang ) {
					var properties = {};
					var bundle = bundles[ bundleId ];
					lang.order.forEach( function( langRef ) {
						if( langRef in bundle ) {
							Object.keys( bundle[ langRef ] ).forEach( function( k ) {
								properties[ k ] = bundle[ langRef ][ k ];
							});
						}
					});
					var outFile = options.dest.replace("{lang}", lang.key ).replace("{bundle}", bundleId );
					grunt.log.debug( bundleId, lang.key, "->", outFile );
					grunt.file.write( outFile, options.process( properties, lang.key ) );
				});

			});

			grunt.log.ok("generated", langs.length * bundleIds.length, "i18n files (", langs.length, "languages ) from", files.length, "property files");

		});

	};
	
})();
