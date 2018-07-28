// Example gscript template
// Title: Enable SMBv1
// Author: ahhh
// Purpose: Enable SMBv1
// Gscript version: 1.0.0
// ATT&CK: 

//priority:95
//timeout:150

//go_import:github.com/gen0cide/gscript/x/windows as windows

function Deploy() {
    console.log("Starting Enable SMBv1");

    var value = 1;
    windows.AddRegKeyDWORD("LOCAL_MACHINE", "SYSTEM\\CurrentControlSet\\Services\\LanmanServer\\Parameters", "SMB1", value);

    console.log("Done Enable SMBv1");
    return true;
  }
  