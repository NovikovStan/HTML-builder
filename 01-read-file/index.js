const fs = require('fs');
const path = require('path');

const src = fs.createReadStream(path.join(__dirname, 'text.txt'));

let output = '';
src.on('data', text => output += text);
src.on('end', () => console.log(output));
src.on('error', err => console.log('Error: ', err.message));