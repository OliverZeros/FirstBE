const FileDetails = require('./get_file_detail')
const fs = require('fs')
const path = require('path')

const HandingFolder = function(input) {
    let IsFile = input.lastIndexOf('.') > 0;
    if (IsFile) { // Is file then
      if (!fs.existsSync(input)) {
        console.log("This file does not exist in that directory, please try again!")
        return;
      }
      if (input.includes('./src-modules')) {
        console.log("This file located in source folder, you cant handling this file, please try again!")
        return;
      }
      // ---------- Get file ------------ //
      var File = new Array();
      File[0] = FileDetails(input);
      if (File[0] === 'source') {
        console.log('This is source file, you cant handling this file, please try again !')
        return;
      }
      return File;
    }
    else { // Is Folder then:
        if (input === './src-modules') {
            console.log('This is source folder, you cant handling this file, please try again !')
            return;
        }
        if (!fs.existsSync(input)) {
            console.log("This folder does not exist in that directory, please try again!")
            return;
        }
        if (input.includes('./src-modules')) {
            console.log('This folder located in source folder, you cant handling this file, please try again !')
            return;
        }
        // ---------------- Get only File --------------- //
        var FileArr = new Array();
        if(input.lastIndexOf('/') != input.length)
            input += '/';
        const isFile = fileName => {
            return fs.lstatSync(fileName).isFile()
        }
        fs.readdirSync(input).map(fileName => {
        return path.join(input, fileName)
        }).filter(isFile)
        const CheckFolder = fs.readdirSync(input);
        var Folder = new Array();
        var n = 0;
         for(i = 0; i < CheckFolder.length; i++) {
            if (isFile(input + CheckFolder[i])) {
                Folder[n] = CheckFolder[i];
                n++;
            }
        }
      for(i = 0, n = 0; i < Folder.length; i++) {
        if(FileDetails(input+Folder[i]) != null && FileDetails(input+Folder[i]) != 'source') {
          FileArr[n] = FileDetails(input+Folder[i]);
          n++;
        }
      }
      return FileArr;
    }
}
module.exports = HandingFolder;