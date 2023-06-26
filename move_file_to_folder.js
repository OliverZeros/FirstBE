const fs = require('fs');
const path = require("path");

const handingType = function (InputFile) {
    switch(InputFile.Type) {
        case 'image':
            return 'Image';
        case 'text':
            return 'Text';
        case 'bash':
            return 'Bash';
        default:
            return 'Other';
        }
}

const handingName = function (InputFile) {
    let Check = InputFile.FirstName;
    if(Check >= '0' && Check <= '9')
        return '0-9';
    if(Check >= 'a' && Check <= 'd' || Check >= 'A' && Check <= 'D')
        return 'A-D';
    if(Check >= 'e' && Check <= 'h' || Check >= 'E' && Check <= 'h')
        return 'E-H';
    if(Check >= 'i' && Check <= 'l' || Check >= 'I' && Check <= 'L')
        return 'I-L';
    if(Check >= 'm' && Check <= 'p' || Check >= 'M' && Check <= 'P')
        return 'M-P';
    if(Check >= 'q' && Check <= 't' || Check >= 'Q' && Check <= 'T')
        return 'Q-T';
    if(Check >= 'u' && Check <= 'x' || Check >= 'U' && Check <= 'x')
        return 'U-X';
    if(Check >= 'y' && Check <= 'z' || Check >= 'Y' && Check <= 'Z')
        return 'Y-Z';
    return 'Other';
}

const handingSize = function(InputFile) {
    let Check = InputFile.Size / (1024*1024);
    if(Check > 10)
        return 'VeryBig';
    if(Check > 5 && Check <= 10)
        return 'Big';
    if(Check > 1 && Check <= 5)
        return 'Medium';
    if(Check > 0.1 && Check <= 1)
        return 'Small';
    return 'Tiny';
}

const handingTime = function(InputFile) {
    let today = new Date();
    let Check = new Object();
    Check.Date = today.getDate();
    Check.Month = today.getMonth();
    Check.Year = today.getFullYear();
    if(Check.Year === InputFile.ModifiDate.Year) {
        if(Check.Month === InputFile.ModifiDate.Month) {
            if (Check.Date === InputFile.ModifiDate.Date)
                return 'Today';
            if (Check.Date - InputFile.ModifiDate.Date <= 7)
                return 'ThisWeek';
            return 'ThisMonth';
        }
        if(Check.Month - InputFile.ModifiDate.Month < 12)
            return 'ThisYear';
    }
    return 'OtherDay';
}


const CopyFileWithOptional = function (InputFile, InputOptional1, InputOptional2, InputOptional3, InputFolder) {
  // ------------ creating arrays in directory order to handling ------------ //
  let FolderPath = new Array();
  let Optional = [InputOptional1, InputOptional2, InputOptional3];
  for( i = 0; i < Optional.length; i++) {
      if(Optional[i] === undefined) {
          FolderPath[i] = '';
          continue;
      }
         
      if(Optional[i].indexOf('--type') != -1) {
          FolderPath[i] = handingType(InputFile);
          continue;
      }
      switch(Optional[i]) {
          case '--name': {
              FolderPath[i] = handingName(InputFile);
              break;
          }
          case '--size': {
              FolderPath[i] = handingSize(InputFile);
              break;
          }
          case '--modify': {
              FolderPath[i] = handingTime(InputFile);
              break;
          }
          default:
              FolderPath[i] = '';
              break;
      }
  }
  //----------------------- Check folder output is existed ?, if not create that folder ---------------------- //
  let input = InputFolder;
  let ExistFolder = function(input) {
      return input.lastIndexOf('/') == -1;
  }
  let Folder = ''
  if (input.indexOf('./') === -1) {
      Folder = input.slice(0,3);
  }
  else {
      while(!ExistFolder(input)) {
          input = input.slice(input.indexOf('/')+1,input.length);
          if(input.indexOf('/') != -1)
              Folder = path.join(Folder, input.slice(0, input.indexOf('/')));
          else
          Folder = path.join(Folder, input.slice(0, input.length));
          if(!fs.existsSync(Folder)) {
              fs.mkdirSync(Folder, true);
          }
      }
  }

  // ---------------- create output folder ------------------ //
  let x = Folder;
  input = Folder;
  for(i = 0; i < FolderPath.length; i++) {
      x = path.join(input, FolderPath[i]);
      if(!fs.existsSync(x)) {
          fs.mkdirSync(x, true);
      }
      input = x;
  }

  // -------------- handing file ------------------ //
  let FullName = InputFile.Name + InputFile.ExtName
  FullName = path.join(x, FullName)

  if(!fs.existsSync(FullName)) {
      fs.renameSync(InputFile.Path, FullName)
  }

  return;
}
module.exports = CopyFileWithOptional;