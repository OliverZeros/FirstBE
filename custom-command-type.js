const GetCustomCommand = function(inputFile, inputCommand) {
    if(inputCommand === undefined)
        return true;
    let OtherCommand = inputCommand.indexOf('--type') === -1;
    if(OtherCommand)
        return true;
    let OnlyCommand = inputCommand.lastIndexOf('=') === -1;
    if(OnlyCommand)
        return true;
    let ExtendCommand = inputCommand.slice(inputCommand.indexOf('=')+1, inputCommand.length).split(',')
    for(i = 0; i < ExtendCommand.length; i++) {
        if(ExtendCommand[i] === inputFile.Type)
            return true;
    }
    return false;
}

module.exports = GetCustomCommand;