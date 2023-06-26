const text = function(input) {
    switch(input) {
        case '.txt' :
            return true;
        case '.doc' :
            return true;
        case '.docx' :
            return true;
        case '.html' :
            return true;
        default:
            return false;
    }
}

const image = function(input) {
    switch(input) {
        case '.jpg' :
            return true;
        case '.png' :
            return true;
        case '.bmp' :
            return true;
        case '.jpeg' :
            return true;
        case '.raw' :
            return true;
        default:
            return false;
    }
}

const FileType = function(input) {
    if (text(input) === true)
        return 'text';
    if (image(input) === true)
        return 'image';
    if (input === '.sh')
        return 'bash';
    return 'other';
}

module.exports = FileType;