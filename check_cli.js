const CheckOptional = function(input) {
    if(input.indexOf('--t') === -1 && input.indexOf('--m') === -1 && input.indexOf('--n') === -1 && input.indexOf('--s') === -1 &&
        input.indexOf('--type') === -1 && input.indexOf('--modify') === -1 && input.indexOf('--name') === -1 && input.indexOf('--size') === -1)
        return false;
    return true;
}



const CheckCommand = function(input) {
    // ------------ Input is WRONG -------------- //

    let Nothing = input[4] === undefined && input[3] === undefined && input[2] === undefined && input[1] === undefined && input[0] === undefined;
    if(Nothing) {
        console.log("Nothing in this, type any thing !");
        return false;
    }

    let WrongInputFirst = input[0].lastIndexOf('.') === -1;
    if(WrongInputFirst) {
        console.log("THIS IS NOT FILE OR FOLDER, please try again !");
        return false;
    }

    // --------------- Input is File ------------- //

    let OnlyFile = input[4] === undefined && input[3] === undefined && input[2] === undefined && input[1] === undefined && input[0].lastIndexOf('.') > 0;
    if (OnlyFile) {
        console.log("Not have any optional, please try again !");
        return false;
    }

    // -------- Only 1 optional input ----- //
    let OnlyOneOptional = input[4] === undefined && input[3] === undefined && input[2] === undefined && input[0].lastIndexOf('.') > 0;
    if (OnlyOneOptional) {
        let CheckTrueOptional = CheckOptional(input[1]);
        if (CheckTrueOptional) {
            console.log("This file need output, please try again !");
            return false;
        }
        else if (input[1].lastIndexOf('.') === 0){
            console.log("This file need optional, please try again !");
            return false;
        }
        else {
            console.log("WRONG COMMAND, please try again !");
            return false;
        }
    }

    // -------- 2 optional input ----- //
    let TwoOptional = input[4] === undefined && input[3] === undefined && input[0].lastIndexOf('.') > 0;
    if (TwoOptional) {
        let CheckTrueOptional = CheckOptional(input[1]);
        if (!CheckTrueOptional) {
            console.log("WRONG FIRST OPTIONAL, please try again !");
            return false;
        }
        let IsPath = input[2].lastIndexOf('.') === 0
        if(IsPath) {
            input[4] = input[2];
            delete(input[2]);
            return true;
        }
        CheckTrueOptional = CheckOptional(input[2]);
        if(!CheckTrueOptional) {
            console.log("WRONG SECOND OPTIONAL, please try again !");
            return false;
        }
        console.log("This file need output, please try again !");
        return false;
    }

    // -------- 3 optional input ----- //
    let ThreeOptional = input[4] === undefined && input[0].lastIndexOf('.') > 0;
    if(ThreeOptional) {
        let CheckTrueOptional = CheckOptional(input[1]);
        if (!CheckTrueOptional) {
            console.log("WRONG FIRST OPTIONAL, please try again !");
            return false;
        }
        CheckTrueOptional = CheckOptional(input[2]);
        if(!CheckTrueOptional) {
            console.log("WRONG SECOND OPTIONAL, please try again !");
            return false;
        }
        let IsPath = input[3].lastIndexOf('.') === 0
        if(IsPath) {
            input[4] = input[3];
            delete(input[3]);
            return true;
        }
        CheckTrueOptional = CheckOptional(input[3]);
        if(!CheckTrueOptional) {
            console.log("WRONG THIR OPTIONALD, please try again !");
            return false;
        }
        console.log("This file need output, please try again !");
        return false;
    }

    // -------- 4 optional input ----- //
    let FourOptional = input[0].lastIndexOf('.') > 0;
    if(FourOptional) {
        let CheckTrueOptional = CheckOptional(input[1]);
        if (!CheckTrueOptional) {
            console.log("WRONG FIRST OPTIONAL, please try again !");
            return false;
        }
        CheckTrueOptional = CheckOptional(input[2]);
        if(!CheckTrueOptional) {
            console.log("WRONG SECOND OPTIONAL, please try again !");
            return false;
        }
        CheckTrueOptional = CheckOptional(input[3]);
        if(!CheckTrueOptional) {
            console.log("WRONG THIRD OPTIONAL, please try again !");
            return false;
        }
        let IsPath = input[4].lastIndexOf('.') === 0
        if(IsPath) {
            return true;
        }
        CheckTrueOptional = CheckOptional(input[4]);
        if(!CheckTrueOptional) {
            console.log("WRONG FOURTH OPTIONAL, please try again !");
            return false;
        }
        console.log("INPUT OPTIONAL SO MUCH, please try again !");
        return false;
    }

    // --------------- Input is Folder ------------- //

    let OnlyFolder = input[4] === undefined && input[3] === undefined && input[2] === undefined && input[1] === undefined && input[0].lastIndexOf('.') === 0;
    if(OnlyFolder) {
        console.log("Not have any optional, please try again !");
        return false;
    }

    // -------- Only 1 optional input ----- //
    OnlyOneOptional = input[4] === undefined && input[3] === undefined && input[2] === undefined && input[0].lastIndexOf('.') === 0;
    if(OnlyOneOptional) {
        let CheckTrueOptional = CheckOptional(input[1]);
        if (CheckTrueOptional) {
            input[4] = input[0].slice(0, input[0].lastIndexOf('/')+1);
            return true;
        }
        else if (input[1].indexOf('/') != -1){
            console.log("This file need optional, please try again !");
            return false;
        }
        else {
            console.log("WRONG FIRST OPTIONAL, please try again !");
            return false;
        }
    }

    // -------- 2 optional input ----- //
    TwoOptional = input[4] === undefined && input[3] === undefined && input[0].lastIndexOf('.') === 0;
    if (TwoOptional) {
        let CheckTrueOptional = CheckOptional(input[1]);
        if (!CheckTrueOptional) {
            console.log("WRONG FIRST OPTIONAL, please try again !");
            return false;
        }
        let IsPath = input[2].lastIndexOf('.') === 0
        if(IsPath) {
            input[4] = input[2];
            delete(input[2]);
            return true;
        }
        CheckTrueOptional = CheckOptional(input[2]);
        if(!CheckTrueOptional) {
            console.log("WRONG SECOND OPTIONAL, please try again !");
            return false;
        }
        input[4] = input[0].slice(0, input[0].lastIndexOf('/')+1);
        return true;
    }

    // -------- 3 optional input ----- //
    ThreeOptional = input[4] === undefined && input[0].lastIndexOf('.') === 0;
    if(ThreeOptional) {
        let CheckTrueOptional = CheckOptional(input[1]);
        if (!CheckTrueOptional) {
            console.log("WRONG FIRST OPTIONAL, please try again !");
            return false;
        }
        CheckTrueOptional = CheckOptional(input[2]);
        if(!CheckTrueOptional) {
            console.log("WRONG SECOND OPTIONAL, please try again !");
            return false;
        }
        let IsPath = input[3].lastIndexOf('.') === 0
        if(IsPath) {
            input[4] = input[3];
            delete(input[3]);
            return true;
        }
        CheckTrueOptional = CheckOptional(input[3]);
        if(!CheckTrueOptional) {
            console.log("WRONG THIR OPTIONALD, please try again !");
            return false;
        }
        input[4] = input[0].slice(0, input[0].lastIndexOf('/')+1);
        return true;
    }
    // -------- 4 optional input ----- //
    FourOptional = input[0].lastIndexOf('.') === 0;
    if(FourOptional) {
        let CheckTrueOptional = CheckOptional(input[1]);
        if (!CheckTrueOptional) {
            console.log("WRONG FIRST OPTIONAL, please try again !");
            return false;
        }
        CheckTrueOptional = CheckOptional(input[2]);
        if(!CheckTrueOptional) {
            console.log("WRONG SECOND OPTIONAL, please try again !");
            return false;
        }
        CheckTrueOptional = CheckOptional(input[3]);
        if(!CheckTrueOptional) {
            console.log("WRONG THIRD OPTIONAL, please try again !");
            return false;
        }
        let IsPath = input[4].lastIndexOf('.') === 0
        if(IsPath) {
            return true;
        }
        CheckTrueOptional = CheckOptional(input[4]);
        if(!CheckTrueOptional) {
            console.log("WRONG FOURTH OPTIONAL, please try again !");
            return false;
        }
        console.log("INPUT OPTIONAL SO MUCH, please try again !");
        return false;
    }
} 

module.exports = CheckCommand;