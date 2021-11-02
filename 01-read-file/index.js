const fs = require('fs');
const path = require('path');
let file = path.join(__dirname, 'text.txt');
let stream = new fs.ReadStream(file, 'utf-8');
stream.on('readable', () => {
    let content = stream.read();
    content !== null ? console.log(content) : '';
})