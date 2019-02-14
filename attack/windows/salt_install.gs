// Example gscript template
// Title: Salt Minion Example
// Author: ahhh
// Purpose: Drops Salt Minion installer as an asset and executes it async
// Gscript version: 1.0.0
// ATT&CK: 
// Includes: 

//priority:150
//timeout:150

//import:bootstrap-salt.ps1

//go_import:os as os

function Deploy() {  
    console.log("Starting to drop salt installer");
    // Getting our asset
    var saltBin = GetAssetAsBytes("bootstrap-salt.ps1");
    console.log("errors: "+Dump(saltBin[1]));

    // Write our salt installer file
    fullpath = "C:\\salt.ps1";
    console.log("file name: "+ fullpath);
    errors = G.file.WriteFileFromBytes(fullpath, saltBin[0]);
    console.log("errors: "+Dump(errors));

    // Get Hostname
    var obj = os.Hostname();

    // Run install
    var running = G.exec.ExecuteCommand("powershell", [fullpath, "-minion", obj[0], "-master", ""]);
    console.log("errors: "+Dump(running[1]));

    return true
}
