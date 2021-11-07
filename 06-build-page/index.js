const fs = require('fs');
const path = require('path');

const dist = path.join(__dirname, 'project-dist');
const code = path.join(__dirname, 'template.html');
const styles = path.join(__dirname, 'styles');

const assets = path.join(__dirname, 'assets');

const components = path.join(__dirname, 'components');

fs.mkdir(dist, { recursive: true }, err => {
    if(err) throw err;
})

const html = path.join(dist, 'index.html');
const style = path.join(dist, 'style.css');

fs.open(html, 'w', (err) => {
    if(err) throw err
})

const assets_copy = path.join(dist, 'assets');

fs.readFile(code, 'utf-8', (err, data) => {
    if(err) throw err;
    fs.writeFile(html, data, 'utf-8', (err) => {
        if(err) throw err
    })
    fs.readFile(html, 'utf-8', (err, data_l) => {
        if(err) throw err;

        fs.readdir(components, (err, files_html) => {
            if(err) throw err;
            files_html.forEach(htmlFile => {
                let htmlWay = path.join(components, htmlFile)
                let htmlName = htmlFile.split('.')[0]
                let htmlExt = htmlFile.split('.')[1]
                if(htmlExt === 'html') {
                    fs.readFile(htmlWay, 'utf-8', (err, htmlData) => {
                        if(err) throw err;
                        data_l = data_l.replace(new RegExp(`{{${htmlName}}}`, 'g'), htmlData)
                        fs.writeFile(html, data_l, 'utf-8', (err) => {
                            if(err) throw err
                        })
                    })
                } else {
                    console.log(`file ${htmlFile} is not a html file`)
                }
            })
        })
    })
})

fs.readdir(styles, (err, files) => {
    if(err) throw err;
    files.forEach(file => {
        let teg = path.extname(file).slice(1);
        if(teg === 'css') {
            let fileName = path.join(styles, file);
            fs.readFile(fileName, 'utf-8', (err, data) => {
                if(err) throw err;
                fs.appendFile(style, data+'\n', (err) => {
                    if(err) throw err
                })
            })
        }
    })
})

fs.mkdir(assets_copy, { recursive: true }, (err) => {
    if(err) throw err
})
fs.readdir(assets, (err, files_b) => {
    if(err) throw err;
    files_b.forEach(files => {
        let inside_assets_copy = path.join(assets_copy, files);
        fs.mkdir(inside_assets_copy, { recursive: true } , err => {
            if(err) throw err;
        })

        let file = path.join(assets, files);
        fs.readdir(file, (err, list) => {
            if(err) throw err;
            list.forEach(fileForCopy => {
                let inside_aseets_file = path.join(inside_assets_copy, fileForCopy)
                let full_file = path.join(file, fileForCopy)
                        fs.copyFile(full_file, inside_aseets_file, (err) => {
                            if(err) throw err
                        });
                
            })
        })
    })
})