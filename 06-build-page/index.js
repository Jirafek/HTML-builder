const fs = require('fs');
const path = require('path');


const dist = path.join(__dirname, 'project-dist');
const code = path.join(__dirname, 'template.html');
const styles = path.join(__dirname, 'styles');

const assets = path.join(__dirname, 'assets');

const components = path.join(__dirname, 'components');
  const header = path.join(components, 'header.html');
  const articles = path.join(components, 'articles.html');
  const footer = path.join(components, 'footer.html');


fs.mkdir(dist, { recursive: true }, err => {
    if(err) throw err;
})

const html = path.join(dist, 'index.html');
const style = path.join(dist, 'style.css');

const assets_copy = path.join(dist, 'assets');



fs.readFile(code, 'utf-8', (err, data) => {
    if(err) throw err;
    fs.writeFile(html, data, 'utf-8', (err) => {
        if(err) throw err
    })
    fs.readFile(html, 'utf-8', (err, data_l) => {
        if(err) throw err;2

        fs.readFile(header, 'utf-8', (err, d_h) => {
            if(err) throw err;
            data_l = data_l.replace(new RegExp('{{header}}', 'g'), d_h)
            fs.writeFile(html, data_l, 'utf-8', (err) => {
                if(err) throw err
            })
        })

        fs.readFile(articles, 'utf-8', (err, d_a) => {
            if(err) throw err;
            data_l = data_l.replace(new RegExp('{{articles}}', 'g'), d_a)
            fs.writeFile(html, data_l, 'utf-8', (err) => {
                if(err) throw err
            })
        })

        fs.readFile(footer, 'utf-8', (err, d_f) => {
            if(err) throw err;
            data_l = data_l.replace(new RegExp('{{footer}}', 'g'), d_f)
            fs.writeFile(html, data_l, 'utf-8', (err) => {
                if(err) throw err
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
        let who = eval(``)
        fs.readdir(file, (err, list) => {
            if(err) throw err;
            list.forEach(fileForCopy => {
                let full_file = path.join(file, fileForCopy)
                fs.readFile(full_file, 'utf-8', (err, data) => {
                    if(err) throw err;
                    let inside_aseets_file = path.join(inside_assets_copy, fileForCopy)
                    fs.appendFile(inside_aseets_file, data, (err) => {
                        if(err) throw err;
                    })
                })
            })
        })
    })
})