const FileDetails = require('./check-file-or-folder')
const HandingCommand = require('./custom-command-type')
const CopyFile = require('./move_file_to_folder')
const CheckCommand = require('./check_cli')

const HandingFile = function(input) {
    if(input[0].length === 1) { // Is file then:
        let TrueExtendCommand = HandingCommand(input[0][0], input[1]) && HandingCommand(input[0][0], input[2]) && HandingCommand(input[0][0], input[3])
        if(TrueExtendCommand)
            CopyFile(input[0][0], input[1], input[2], input[3], input[4]);
    }
    else { // Is folder then:
        let i = 0;
        while(i < input[0].length) {
            let TrueExtendCommand = HandingCommand(input[0][i], input[1]) && HandingCommand(input[0][i], input[2]) && HandingCommand(input[0][i], input[3])
            if(TrueExtendCommand)
                CopyFile(input[0][i], input[1], input[2], input[3], input[4]);
            i++;
        }
    }
    return;
}

const Handing = function (input) {
    if(!CheckCommand(input))
      return;
    if (FileDetails(input[0]) != undefined) {
      input[0] = FileDetails(input[0]);
      HandingFile(input);
    }
    return;
  }

const changeCommand = function (input) {
    if (input.indexOf('--t') !== -1) 
        return input = '--type'+  input.slice(input.lastIndexOf('--t') + 3, input.length);
    if (input.indexOf('--m') !== -1)
        return input = '--modify'+  input.slice(input.lastIndexOf('--m') + 3, input.length);
    if (input.indexOf('--n') !== -1)
        return input = '--name'+  input.slice(input.lastIndexOf('--n') + 3, input.length);
    if (input.indexOf('--s') !== -1)
        return input = '--size'+  input.slice(input.lastIndexOf('--s') + 3, input.length);
    return input;
}
const agrument = process.argv.splice(2);
for (let i = 0; i < agrument.length; i++) {
    agrument[i] = changeCommand(agrument[i]);
}
console.log(agrument)
Handing(agrument);



