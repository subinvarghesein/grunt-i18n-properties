/*
 * grunt-i18n-properties
 * https://github.com/Aconex/grunt-i18n-properties
 *
 * Copyright (c) 2014 Ben Birch
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({

		i18n: {
			js: {
				options: {
					process: function( properties, lang ) {
						return "strings['" + lang + "'] = " + JSON.stringify( properties, null, "  " ) + ";";
					},
					primary: "en",
					langs: [ "en_AU", "en_US", "es_ES", "zh_CN" ],
					dest: "strings/{lang}/{bundle}.js"
				},
				src: [ 'sample/*.properties' ]
			},
			json: {
				options: {
					process: function( properties ) {
						return JSON.stringify( properties );
					},
					primary: false,
					langs: [ "en", "es", "zh" ],
					dest: "strings/{lang}/{bundle}.json"
				},
				src: [ 'sample/*.properties' ]
			}
		}

	});

	grunt.loadTasks('tasks');

	grunt.registerTask('default', ['i18n']);

};
