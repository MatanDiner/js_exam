//console.log(process.argv);
const path = require('path');
const fs = require('fs');
const appDir = path.dirname(require.main.filename);

function searchFilesInDirectory(dir,ext,filter) {
    if (!fs.existsSync(dir)) {
        console.log(`Specified directory: ${dir} does not exist`);
        return;
    }

    const found = getFilesInDirectory(dir, ext);    
    let wordFoundInFile = false;
    found.forEach(file => {
        const fileContent = fs.readFileSync(file);

        const regex = new RegExp('\\b' + filter + '\\b');
        if (regex.test(fileContent)) {
            console.log(file);
            wordFoundInFile = true;
        }
    });
    if(!wordFoundInFile || found.length==0){
        console.log('No File Was Found');
    }
  
}

function getFilesInDirectory(dir, ext) {
    if (!fs.existsSync(dir)) {
        console.log(`Specified directory: ${dir} does not exist`);
        return;
    }

    let files = [];
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.lstatSync(filePath);

        if (stat.isDirectory()) {
            const nestedFiles = getFilesInDirectory(filePath, ext);
            files = files.concat(nestedFiles);
        } else {
            if (path.extname(file) === ext) {
                files.push(filePath);
            }
        }
    });

    return files;
}


if(process.argv.length>2){
    searchFilesInDirectory(appDir,'.' + process.argv[2],process.argv[3]);
}
else{
    console.log('USAGE: node search [EXT] [TEXT]')
}

