const fs = require('fs');
const path = require('path');

const styles = path.join(__dirname, 'styles');
const bundl = path.join(__dirname, 'project-dist', 'bundle.css');

function setStyles() {
    fs.readdir(styles, (err, files) => {
        if(err) throw err;
        files.forEach(file => {
            let teg = path.extname(file).slice(1);
            if(teg === 'css') {
                let fileName = path.join(styles, file);
                fs.readFile(fileName, 'utf-8', (err, data) => {
                    if(err) throw err;
                    fs.appendFile(bundl, data+'\n', (err) => {
                        if(err) throw err
                    })
                })
            }
        })
    })
}

fs.access(bundl, (err) => {
    if(err) {
        setStyles()
    } else {
        fs.unlink(bundl, err => {
            if(err) throw err;
        })
        setTimeout(() => {
            setStyles()
        }, 500)
    }
})

