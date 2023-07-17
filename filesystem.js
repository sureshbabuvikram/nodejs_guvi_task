// content of a file current timestamp
// writefile
const fs = require('fs');

const filePath = 'path/to/file.json';

const timestamp = Date.now();

const data = {
  timestamp: timestamp
};

const jsonData = JSON.stringify(data);

fs.writeFile(filePath, jsonData, 'utf8', (err) => {
  if (err) {
    console.error('Error writing file:', err);
    return;
  }

  console.log('File has been saved with the current timestamp.');
});


//the filename should be only date and time for the addon of the same
const fs = require('fs');
const path = require('path');

const currentDate = new Date();
const timestamp = currentDate.getTime();

const fileName = `${currentDate.toISOString()}.json`;
const filePath = path.join('path/to/directory', fileName);

const data = {
  timestamp: timestamp
};

const jsonData = JSON.stringify(data);

fs.writeFile(filePath, jsonData, 'utf8', (err) => {
  if (err) {
    console.error('Error writing file:', err);
    return;
  }

  console.log('File has been saved with the current timestamp.');
});
