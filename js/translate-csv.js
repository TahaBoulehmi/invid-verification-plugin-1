/**
* Managment of functions allowing invid plugin translations
*/

/* @url_csv link to download google spreadsheet as csv or to the csv file directly */
var url_csv = config_url_csv;

/* @lang_array_csv variable containing csv as array, used to save result from translate_csv */
var lang_array_csv = [];

/* @json_lang_translate variable containing translations in json */
var json_lang_translate = null;

/**
* @func returns a list containing all field starting with startswith to ease access of json (example: 'video_desc_1', 'video_desc_2', ...)
* @json contains the translation spreadsheet as json, without the language variables
* @startswith the static part of the json having key starting with startswith
* @return list containing all wanted texts
*/
function list_from_json(json, startswith) 
{
	var i = 1;
	var res = [];
	while( json[startswith + i] !== undefined ) {
		res.push( json[startswith + i] );
		++i;
	}
	return res;
}

/**
* @func transform array in json representation of translation (access this way: json[global_language][id_translate])
* @array the array representation of the csv
* @return the json representation of the csv
*/
function array_to_json(array) 
{
	var json = {};
	for( var i = 1; i < array[0].length; ++i ) {
		var lang = array[0][i].replace( "\r", "" );
		json[lang] = {};
		for( var j = 1; j < array.length; ++j ) {
			if( array[j] && array[j][i] && typeof array[j][i] != undefined ) {
				json[lang][array[j][0]] = array[j][i].replace( "\r", "" );
			} else {
				json[lang][array[j][0]] = "";
			}
		}
	}
	return json;
}

/**
* @func transform csv string to its array representation
* @csv csv string
* @return array representation of csv string
*/
function csv_to_array(csv) 
{
	rows = csv.split( "\n" );
	return rows.map( function( row ) {
		return row.split( "\t" );
	});
}

/**
* @func get the google spreadsheet or csv file localy and stores its content as an array in lang_array_csv
* @path url to google spreadsheet or path to csv local file
*/
function translate_csv(path) 
{
	if( navigator.onLine ) {
		var rawFile = new XMLHttpRequest();
		rawFile.onreadystatechange = function () {
			if( rawFile.readyState === 4 && ( rawFile.status === 200 || rawFile.status == 0 ) ) {
				var allText = rawFile.responseText;
				lang_array_csv = csv_to_array(allText);
				json_lang_translate = array_to_json( lang_array_csv );
				updateLanguageText(global_language);
				updateAllTranslations( global_language );
			} else if( /* true || */ rawFile.readyState === 4 ) {
				var localFile = new XMLHttpRequest();
				localFile.onreadystatechange = function () {
					if( localFile.readyState === 4 ) {
						if( localFile.status === 200 || localFile.status == 0 ) {
							var allText = localFile.responseText;
							lang_array_csv = csv_to_array( allText );
							json_lang_translate = array_to_json( lang_array_csv );
							updateLanguageText(global_language);
							updateAllTranslations( global_language );
						}
					}
				}
				localFile.open( "GET", "InVIDTraductions.tsv", true );
				localFile.send( null );
			}
		}
		rawFile.open( "GET", path, true );
		rawFile.send( null );
	} else {
		var localFile = new XMLHttpRequest();
		localFile.onreadystatechange = function () {
			if( localFile.readyState === 4 ) {
				if( localFile.status === 200 || localFile.status == 0 ) {
					var allText = localFile.responseText;
					lang_array_csv = csv_to_array( allText );
					json_lang_translate = array_to_json( lang_array_csv );
					updateLanguageText(global_language);
					updateAllTranslations( global_language );
				}
			}
		}
		localFile.open( "GET", "InVIDTraductions.tsv", true );
		localFile.send( null );
	}
}
