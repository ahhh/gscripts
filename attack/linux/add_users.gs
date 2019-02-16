// Example gscript template
// Title: add user in linux
// Author: duffffffff
// Purpose: conviently add some users, in linux
// Gscript version: 1.0.0
// ATT&CK:
// Tactic: Do thing right away

//priority:200
//timeout:150

function Deploy() {
    //adduser nameOfTheAddedUser
    var response1 = G.exec.ExecuteCommand("useradd", ["-m", "-p", "lol123", "-s", "/bin/bash", "spoderman"]);
    console.log("Pid: "+response1[0]);
    console.log("stdout: "+response1[1]);
    console.log("stderr: "+response1[2]);
    console.log("exit code: "+response1[3]);
    console.log("go errors: "+Dump(response1[4]));
    console.log("done adding users")
}
