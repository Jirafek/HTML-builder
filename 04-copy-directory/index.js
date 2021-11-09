const fs = require('fs');
const path = require('path')

const files_bag = path.join(__dirname, 'files')
const copy_bag = path.join(__dirname, 'files-copy')

function setCopy() {
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
}

fs.access(copy_bag, (err) => {
    if (err) {
        setCopy()
    } else {
        fs.readdir(copy_bag, (err, copied_files) => {
            if(err) throw err;
            copied_files.forEach(copiedFile => {
                let copiedWay = path.join(copy_bag, copiedFile);
                fs.unlink(copiedWay, (err) => {
                    if(err) throw err;
                })
            })
        })
        fs.rmdir(copy_bag, { recursive: true }, err => {
            if(err) throw err;
        })

        setTimeout(() => {
            setCopy()
        }, 500)
    }
});

