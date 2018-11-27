//console.log(process.argv);
const path = require('path');
const fs = require('fs');
const appDirectoryPath = path.dirname(require.main.filename);

function searchFilesInDirectory(dir,ext,filter) {

    const found_files = getFilesInDirectory(dir, ext);    
    let wordFoundInFile = false;
    found_files.forEach(file => {
        const fileContent = fs.readFileSync(file);

        const regex = new RegExp('\\b' + filter + '\\b');
        if (regex.test(fileContent)) {
            console.log(file);
            wordFoundInFile = true;
        }
    });
    if(!wordFoundInFile || found_files.length==0){
        console.log('No File Was Found');
    }
  
}

function getFilesInDirectory(dir, ext) {

    let files = [];
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.lstatSync(filePath);

        if (stat.isDirectory()) {
            const FilesInDirectory = getFilesInDirectory(filePath, ext);
            files = files.concat(FilesInDirectory);
        } else {
            if (path.extname(file) === ext) {
                files.push(filePath);
            }
        }
    });

    return files;
}


if(process.argv.length>2){
    searchFilesInDirectory(appDirectoryPath,'.' + process.argv[2],process.argv[3]);
}
else{
    console.log('USAGE: node search [EXT] [TEXT]')
}

