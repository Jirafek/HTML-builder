const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const process = require('process');

const directory = path.join(__dirname, 'text.txt')
const rl = readline.createInterface({ input, output });

let stream = new fs.WriteStream(directory, 'utf-8')

console.log('\n Hello, write your text here: \n')

rl.on('line', (input) => {
    if(input === 'exit') {
        rl.close()
    } else {
        fs.appendFile(directory, input+'\n', (err) => {
            if(err) throw err
        })
    }
});
rl.on('pause', () => {
    console.log('\nGood bye, see you\n');
});

process.on('SIGINT', () => {process.exit();});