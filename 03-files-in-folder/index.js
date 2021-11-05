const fs = require('fs');
const path = require('path');

const folder = path.join(__dirname, 'secret-folder');

fs.readdir(folder, (err, files) => {
    if(err) throw err
    files.forEach(file => {
        let fileName = path.join(folder, file)

        let teg = path.extname(file).slice(1);
        let name = file.split('.')[0];

        fs.stat(fileName, (err, stats) => {
            if(err) throw err;
            let fileSize = `${stats.size} b`;
            if(stats.isFile()) {
                console.log(`${name} - ${teg} - ${fileSize}`)
            }
        });
    });
  })