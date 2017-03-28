/**
 * Requires
 */
var path = require('path'),
	fs = require('fs');

/**
 * Define variables
 */
var jsonDB = 'example_1.json';
var filePath = path.join(__dirname, '../local.db/' + jsonDB);


function _openFIle(){
	var fileData = fs.readFileSync(filePath, 'utf8');
	return JSON.parse(fileData);
};

function _saveFile(data){
	var dataToSave = JSON.stringify(data);
	fs.writeFileSync(filePath, dataToSave, 'utf8');
};

/**
 * Open file and read data from, convert to JSON and return
 * @private
 */
function _getDataFromFile(){
	var fileData = _openFIle();
	return fileData;
};

/**
 * Open file, convert to json, append data to the end of file and save
 * @private
 */
function _appendDataToFile(data){
	try {
		var dataToAppend = data;
		var fileData = _openFIle();

		fileData.DB.push(dataToAppend);
		fileData.Total = fileData.DB.length;

		_saveFile(fileData);
		return true;
	} catch (ex){
		console.log('Something wrong', ex);
		return false;
	}
};


/**
 * Open file, read and convert to json, append data, and save it
 * @param data
 * @private
 */
function _saveDataToFile(data){

};

/**
 * Interface for working with example_1 JSON based database
 * @type {{getData: module.exports.getData, addData: module.exports.addData, saveData: module.exports.saveData}}
 */
module.exports = {
	getData: _getDataFromFile,
	addData: _appendDataToFile,
	saveData: _saveDataToFile
};