# grunt-i18n-properties

> grunt plugin for converting java property i18n and l10n files to javascript source or json

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-i18n-properties --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-i18n-properties');
```

## The "i18n" task

### Overview

i18n converts a bunch of java i18n property files into locale specific json files. A `bundle` of i18n files have a three level hierarchy:

# specific localisations for regional language variations ( eg `en_AU`, `pt_BR` ) - usually only some keys are localised
# a file for each supported language ( eg `es`, `it`, `jp`, `zh`) - most keys are translated
# the primary development (fallback) language (often English `en`) - all keys are available in the development language

Project_en.properties

	Project.Name = grunt-i18n-properties
	Project.Description = A great little project

Project_es.properties

	Project.Description = Un pequeño gran proyecto

Project_en_AU

	Project.Description = A little ripper of a project

grunt-i18n-properties provides the best available translation from any of the three levels that are available

for example

generating a `en_AU` file will produce

	Project.Name = grunt-i18n-properties
	Project.Description = A little ripper of a project

selecting the `Project.Name` from the generic `en` file, and the `Project.Description` from the region specific `en_AU` file.

generating a `pt_BR` file will produce results just from the `en` file ( providing Brazilian portuguese users with english ), since neither `pt` nor `br_BR` files are available.


### Options

#### options.process
Type: `Function( properties, language )`
Default value: JSON.stringify

A function that transforms the final properties map into the string that is written to the language file. 

convert to json: `function( prop ) { return JSON.stringify( prop ); }`
push the properties into a javascript object with the language as a key `function( prop, lang ) { return "strings['" + lang + "'] = " + JSON.stringify( prop ) + ";"}`
pretty print json `function( prop ) { return JSON.stringify( prop, null, "  " ); }`

#### options.primary
Type: `String` or `false`
Default value: `"en"`

The primary development language. Eg the fallback language used when a key has not been translated yet
if `primary` is `false`, no fallback is used, so untranslated keys will be missing

#### options.langs
Type: `Array of Strings`
Default value: `["en_AU"]`

An array of all the languages you wish to support. Typically you would provide languages with the regional component, though this is not required.

a typical example might look like `["en_US", "en_UK", "en_AU", "fr_FR", "de_DE", "it_IT", "es_ES" "pt_PT", "zh_CN", "ja_JP", "ko_KR", "ar_EG"]`

#### options.dest
Type: `String`
Default value: `"strings/{lang}/{bundle}.json"`

A path pattern for writing out the i18n json files.

`{lang}` is replaced with one of the codes from `options.langs`

`{bundle}` is replaced with the name of the language bundle. In the example above this would be `Project`

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.

## Release History

**0.1.0** Initial Publish
