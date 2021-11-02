const fs = require('fs');
const path = require('path')

const files_bag = path.join(__dirname, 'files')
const copy_bag = path.join(__dirname, 'files-copy')

fs.mkdir(copy_bag, { recursive: true }, err => {
    if(err) throw err;
})

fs.readdir(files_bag, (err, files) => {
    if(err) throw err;
    files.forEach(file => {
        let fileName = path.join(files_bag, file);
        let copyFileName = path.join(copy_bag, file)

        fs.copyFile(fileName, copyFileName, (err) => {
            if(err) throw err;
        })
    })
})