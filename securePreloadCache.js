const fs = require('fs')

fs.readFile('./font-preload-cache.json', 'utf-8', (err, data) => {
    if (err) {
        console.log(`Error reading file from disk: ${err}`);
    } else {
        const newData = data.replace(/http/g, 'https')
        fs.writeFile('./font-preload-cache.json', newData, 'utf-8', (err) => {
            if (err) {
                console.log(`Error writing file: ${err}`)
            } else {
                console.log('File written succesffuly')
            }
        })
    }
})